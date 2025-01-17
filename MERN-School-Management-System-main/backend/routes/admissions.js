const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

// Get all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new admission
router.post('/', async (req, res) => {
  const admission = new Admission(req.body);
  try {
    const newAdmission = await admission.save();
    res.status(201).json(newAdmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit an admission
router.put('/:id', async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an admission
router.delete('/:id', async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json({ message: "Admission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;