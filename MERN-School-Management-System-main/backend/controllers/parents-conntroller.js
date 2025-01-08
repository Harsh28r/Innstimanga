// registerController.js
const User = require('../models/parentSchema');

const registerUser = async (req, res) => {
    const userData = req.body.userData;
    const role = req.body.role;

    try {
        const newUser = new User(userData);
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

module.exports = { registerUser };