const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    feeType: { type: String, required: true },
    dueDate: { type: Date, required: true },
    grade: { type: String, required: true },
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;