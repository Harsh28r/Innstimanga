// ...existing code...
const nodemailer = require('nodemailer');

// ...existing code...

// Send OTP to user's email
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresIn = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.emailVerificationToken = otp;
    user.emailVerificationExpires = expiresIn;
    await user.save();

    // Send OTP to the user's email using Nodemailer
    // ...

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.emailVerificationToken !== otp || user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};




const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, schoolName, instituteAddress } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (!existingUser.isEmailVerified) {
      return res.status(400).json({ error: 'Email not verified' });
    }

    // Create a new user
    // ...

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};