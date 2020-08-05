const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // Looking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Get email and password from request
    const { email, password } = req.body;

    try {
        // looking if user us registered by email
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        // check password
        const correctPass = await bcryptjs.compare(password, user.password);

        if (!correctPass) {
            return res.status(400).json({msg: 'Email or Password incorrect!'});
        }

        // is all is right create and sign jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        // sign jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {
            if (error) throw error;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
    }
}