const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // Looking for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // Destructuring
    const {
        email,
        password
    } = req.body;

    try {
        // check that registered user is unique
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                msg: 'User already exists!'
            });
        }

        // create new user
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // insert new user
        await user.save();

        // create and sign jwt
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
            res.json({msg: 'User created successfully', token});
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }
}