const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Generate OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// Store the generated OTPs in memory (you can use a database in production)
const otpStore = new Map();

// OTP expiration time (in milliseconds)
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

// Rate limiting configuration
const MAX_REQUESTS_PER_HOUR = 5;
const requestCounts = new Map();

// Send OTP via Email
router.post('/sendOTP', (req, res) => {
    const { email } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check rate limiting
    const currentTime = Date.now();
    const requestCount = requestCounts.get(email) || 0;
    if (requestCount >= MAX_REQUESTS_PER_HOUR) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const otp = generateOTP();

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for Email Verification',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to send OTP' });
        } else {
            // Store the OTP and its expiration time
            otpStore.set(email, { otp, expiresAt: currentTime + OTP_EXPIRATION_TIME });

            // Update rate limiting count
            requestCounts.set(email, requestCount + 1);

            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
});

// Verify OTP
router.post('/verifyOTP', (req, res) => {
    const { email, otp } = req.body;

    // Validate email and OTP format
    if (!isValidEmail(email) || !isValidOTP(otp)) {
        return res.status(400).json({ error: 'Invalid email or OTP format' });
    }

    const storedOTP = otpStore.get(email);

    if (storedOTP && storedOTP.otp === parseInt(otp) && Date.now() <= storedOTP.expiresAt) {
        // OTP matches and is not expired
        otpStore.delete(email); // Remove the OTP after successful verification
        res.status(200).json({ message: 'Email verified successfully' });
    } else {
        res.status(400).json({ error: 'Invalid or expired OTP' });
    }
});

// Helper functions
function isValidEmail(email) {
    // Implement email validation logic
    // Return true if email is valid, false otherwise
}

function isValidOTP(otp) {
    // Implement OTP validation logic
    // Return true if OTP is valid, false otherwise
}

module.exports = router;

