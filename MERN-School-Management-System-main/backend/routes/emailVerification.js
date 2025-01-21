const express = require('express');
const router = express.Router();
const { 
  sendEmailVerification, 
  verifyEmailOTP 
} = require('../controllers/emailVerificationController');

// Add a GET endpoint for testing
router.get('/', (req, res) => {
    res.send('Email verification API is working');
});

router.post('/send-verification', sendEmailVerification);
router.post('/verify-otp', verifyEmailOTP);

module.exports = router; 