const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const workLines = require('../routes/workLines')
const auth = require('../routes/auth');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/worklines', workLines);
    app.use(error);
}