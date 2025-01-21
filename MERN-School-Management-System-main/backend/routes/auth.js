// routes/auth.js
const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, email, password, role, childRollNo, aadharNo } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        childRollNo,
        aadharNo,
    });

    try {
        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

router.get('/register', (req, res) => {
    // You can send a response or render a registration form here
    res.status(200).json({ message: 'Registration endpoint' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ success: true, message: 'Login successful', user });
});

router.get('/login', (req, res) => {
    // You can send a response or render a login form here
    res.status(200).json({ message: 'Login endpoint' });
});

module.exports = router;