const Task = require('../models/Task.js');
const Project = require('../models/Project.js');
const {validationResult} = require('express-validator');

exports.createTask = async (req, res) => {
    // Looking for errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        // Get the project and existance
        const {project} = req.body;
        const existProject = await Project.findById(project);

        if (!existProject) {
            return res.status(404).json({ msg: 'Project not found!' });
        }

        // Checking if current project belong to authenticated user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // Creating task
        const task = new Task(req.body);
        await task.save();
        res.json({task});

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}

exports.getTasks = async (req, res) => {
    // Looking for errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    
    try {
        // Getting existing project
        const {project} = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Project not found!'});
        }

        if(existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get task(s)
        const tasks = await Task.find({ project });
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}
