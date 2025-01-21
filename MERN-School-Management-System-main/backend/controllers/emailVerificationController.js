const Admin = require('../models/adminSchema');
const { sendVerificationEmail } = require('../config/nodemailer');

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for email verification
exports.sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to admin document
    admin.emailVerificationToken = otp;
    admin.emailVerificationExpires = otpExpires;
    await admin.save();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, otp);
    
    if (emailSent) {
      return res.status(200).json({ 
        message: 'Verification OTP sent to email',
        expiresIn: 10 // minutes
      });
    } else {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify OTP
exports.verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find admin and check OTP
    const admin = await Admin.findOne({ 
      email, 
      emailVerificationToken: otp,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark email as verified
    admin.isEmailVerified = true;
    admin.emailVerificationToken = undefined;
    admin.emailVerificationExpires = undefined;
    await admin.save();

    return res.status(200).json({ 
      message: 'Email verified successfully',
      isEmailVerified: true
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 