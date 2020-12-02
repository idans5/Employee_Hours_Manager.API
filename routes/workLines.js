const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { WorkLine, validate } = require('../models/workLine');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    
try {
    const { error }  = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let workLine = new WorkLine(_.pick(req.body, ['username', 'date', 'start', 'exit', 'total']));
    workLine = await workLine.save();

    res.send(workLine);
} catch (ex) {
    next(ex);
}

    
});

router.get('/table', async (req, res) => {
try {
    let work = await await WorkLine.find();
    res.send(work);
} catch (ex) {
    next(ex);
}

    
});


module.exports = router;