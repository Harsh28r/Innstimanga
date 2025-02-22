// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'parent'
    },
    childRollNo: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;