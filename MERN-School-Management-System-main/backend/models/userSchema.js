const mongoose = require('mongoose');

// Check if the User model is already defined
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    childRollNo: String,
    aadharNo: { type: String, required: true },
}));

module.exports = User;