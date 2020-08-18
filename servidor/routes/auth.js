// Routes to auth users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const auth = require('../middlewares/auth.js');
const {check} = require('express-validator');

// Login
// api/auth
router.post('/',
    authController.authenticateUser
); 

// Get authenticated user
router.get('/',
    auth,
    authController.authenticatedUser
);
module.exports = router;