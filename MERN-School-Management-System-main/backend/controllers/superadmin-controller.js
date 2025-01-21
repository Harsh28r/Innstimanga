const SuperAdmin = require('../models/superAdminSchema');
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');

const superAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const superAdmin = await SuperAdmin.findOne({ email });
        
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }

        const validPassword = await bcrypt.compare(password, superAdmin.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        superAdmin.password = undefined;
        res.status(200).json(superAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSchools = async (req, res) => {
    try {
        const schools = await Admin.find({}, { password: 0 });
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const approveSchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const school = await Admin.findByIdAndUpdate(
            schoolId,
            { status: 'approved' },
            { new: true }
        );
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add other superadmin functions as needed

module.exports = {
    superAdminLogin,
    getAllSchools,
    approveSchool
}; 