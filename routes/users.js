const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

router.get('/me', auth, async (req, res) => {
try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
} catch (ex) {
    next(ex);
}

    
});

router.post('/register', async (req, res) => {

try {
    const { error }  = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    req.body.username = req.body.username.toLowerCase();
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('The username is already in use.');

    req.body.email = req.body.email.toLowerCase();
    let email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send('The email is already in use.');

    user = new User(_.pick(req.body, ['username', 'firstname', 'lastname', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['username', '_id','firstname', 'lastname', 'email','isAdmin']));
} catch (error) {
    next(ex);
}

    
});


module.exports = router;