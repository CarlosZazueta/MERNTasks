const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController.js');
const auth = require('../middlewares/auth.js');
const {check} = require('express-validator');


// api/tasks
// Craete a new task
router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tasksController.createTask
);

// Getting tasks by project
router.get('/',
    auth,
    [
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tasksController.getTasks
);

// Update task state
router.put('/:id',
    auth,
    tasksController.updateTask
);

// Delete task
router.delete('/:id',
    auth,
    tasksController.deleteTask
);

module.exports = router;