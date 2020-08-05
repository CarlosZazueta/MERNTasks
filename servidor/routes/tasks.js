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
        check('name', 'Name is required').not().isEmpty(),
        check('project', 'Project is required').not().isEmpty()
    ],
    tasksController.createTask
);

// Getting tasks by project
router.get('/',
    auth,
    [
        check('project', 'Project is required').not().isEmpty()
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