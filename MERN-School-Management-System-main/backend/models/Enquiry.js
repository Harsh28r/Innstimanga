const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  phone: String,
  email: String,
  grade: String,
  status: { type: String, default: 'new' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);