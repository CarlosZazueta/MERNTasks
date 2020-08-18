// Routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {check} = require('express-validator');

// Create user
// api/users
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6})
    ],
    userController.createUser
); 

module.exports = router;