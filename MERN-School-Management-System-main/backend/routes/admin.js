const express = require('express');
const router = express.Router();
const { registerAdmin } = require('../controllers/admin-controller');

// Admin registration route
router.post('/register', registerAdmin);

module.exports = router; 