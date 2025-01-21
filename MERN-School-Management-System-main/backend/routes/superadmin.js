const express = require('express');
const router = express.Router();
const Admin = require('../models/adminSchema');
const SuperAdmin = require('../models/superAdminSchema');
const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');
const Sclass = require('../models/sclassSchema');
const Notice = require('../models/noticeSchema');

// Get all institutes
router.get('/institutes', async (req, res) => {
    try {
        const institutes = await Admin.find({}, { password: 0 });
        res.json(institutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific institute details
router.get('/institute/:id', async (req, res) => {
    try {
        const institute = await Admin.findById(req.params.id, { password: 0 });
        if (!institute) {
            return res.status(404).json({ message: 'Institute not found' });
        }
        res.json(institute);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// SuperAdmin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const superAdmin = await SuperAdmin.findOne({ email });
        
        if (!superAdmin || superAdmin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ 
            _id: superAdmin._id,
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get institute dashboard data
router.get('/institute/:id/dashboard', async (req, res) => {
    try {
        const instituteId = req.params.id;
        
        // Fetch all relevant data for the institute
        const [
            students,
            teachers,
            classes,
            notices
        ] = await Promise.all([
            Student.find({ school: instituteId }),
            Teacher.find({ school: instituteId }),
            Sclass.find({ school: instituteId }),
            Notice.find({ school: instituteId })
        ]);
        
        res.json({
            students,
            teachers,
            classes,
            notices
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 