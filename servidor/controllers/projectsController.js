const Project = require('../models/Project.js');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    // Looking for errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        // create a new project
        const project = new Project(req.body);

        // save creator via jwt
        project.creator = req.user.id;

        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}

// Getting projects from current user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project
            .find({ creator: req.user.id })
            .sort({ created: -1 });

        res.json({
            projects
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}

// Updating project
exports.updateProject = async (req, res) => {
    // Looking for errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Getting project info
    const {name} = req.body;
    const newProject = {};
    
    if (name) {
        newProject.name = name;
    }

    try {
        // Looking for ID
        let project = await Project.findById(req.params.id);

        // if project exists
        if (!project) {
            return res.status(404).json({msg:'Project not found!'});
        }

        //check creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // update project
        project = await Project.findByIdAndUpdate(
            { _id: req.params.id }, 
            { $set: newProject },
            { new : true }
        );

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
}

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        // Looking for ID
        let project = await Project.findById(req.params.id);

        // if project exists
        if (!project) {
            return res.status(404).json({msg:'Project not found!'});
        }

        //check creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // Delete project
        await Project.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Project removed!'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
}