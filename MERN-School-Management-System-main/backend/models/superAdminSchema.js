const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "SuperAdmin"
    }
}, { timestamps: true });

module.exports = mongoose.model("superadmin", superAdminSchema); 