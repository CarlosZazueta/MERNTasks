const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController.js');
const auth = require('../middlewares/auth.js');
const {check} = require('express-validator');

// api/auth
router.post('/', 
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.createProject
);

// Get projects by user
router.get('/', 
    auth, 
    projectsController.getProjects
);

// Update project via ID
router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.updateProject
);

// Delete a project via ID
router.delete('/:id',
    auth,
    projectsController.deleteProject
);

module.exports = router;