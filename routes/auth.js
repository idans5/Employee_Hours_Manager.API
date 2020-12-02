const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

router.post('/login', async (req, res) => {
try {
    const { error }  = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let usernameLower = req.body.username.toLowerCase();
    let user = await User.findOne({ username: usernameLower });
    if (!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');
    user = await User.findById(user._id).select('-password');
    token = user.generateAuthToken();
    let userToReturn = {
        'token': token,
        'user': user
    }

    res.send(userToReturn);
} catch (ex) {
    next(ex);
}

    
});

function validate(req) {
    const schema = {
        username: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;