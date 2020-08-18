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
            return res.status(404).json({ msg: 'Proyecto no encontrado!' });
        }

        // Checking if current project belong to authenticated user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Usuario no autorizado!'});
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
            return res.status(404).json({ msg: 'Proyecto no encontrado!'});
        }

        if(existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado!' });
        }

        // Get task(s)
        const tasks = await Task.find({ project });
        res.json({tasks});
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}

exports.updateTask = async (req, res) => {
    try {
        // Getting existing project and task
        const {project, name, state} = req.body;
        
        let existTask = await Task.findById(req.params.id);

        if (!existTask) {
            return res.status(404).json({ msg: 'Proyecto no encontrado!' });
        }

        // Get project
        const existProject = await Project.findById(project);

        if(existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado!' });
        }
        
        // Create object with new info
        const newTask = {};
        if (name) newTask.name = name; 
        if (state) newTask.state = state;

        // Save task
        existTask = await Task.findByIdAndUpdate(
            { _id: req.params.id},
            newTask,
            { new: true }
        );

        res.json({existTask});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        // Getting existing project and task
        const {project} = req.body;
        
        let existTask = await Task.findById(req.params.id);

        if (!existTask) {
            return res.status(404).json({ msg: 'La tarea no existe!' });
        }

        // Get project
        const existProject = await Project.findById(project);

        if(existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado!' });
        }

        // Delete
        await Task.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error!');
    }
}
