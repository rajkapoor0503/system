const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
    },
    {
        timestamps: true
    },
    );
    module.exports = mongoose.model('Job', jobSchema);