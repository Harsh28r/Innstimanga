const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// Get all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new enquiry
router.post('/', async (req, res) => {
  const { studentName, parentName, phone, email, grade } = req.body;

  // Validate the incoming data
  if (!studentName || !parentName || !phone || !email || !grade) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const enquiry = new Enquiry(req.body);
  try {
    const newEnquiry = await enquiry.save();
    res.status(201).json(newEnquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;