const Joi = require('joi');
const mongoose = require('mongoose');

const workLineSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    exit: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
});

const WorkLine = mongoose.model('WorkLine', workLineSchema);

function validateWorkLine(workLine) {
    const schema = {
        username: Joi.string().required(),
        date: Joi.string().required(),
        start: Joi.string().required(),
        exit: Joi.string().required(),
        total: Joi.string().required(),
    };

    return Joi.validate(workLine, schema);
}

exports.WorkLine = WorkLine;
exports.validate = validateWorkLine;