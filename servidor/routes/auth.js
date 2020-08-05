// Routes to auth users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const {check} = require('express-validator');

// api/auth
router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must contain al least 6 characters').isLength({min: 6})
    ],
    authController.authUser
); 

module.exports = router;