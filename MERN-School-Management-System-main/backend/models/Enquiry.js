const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  phone: String,
  email: String,
  grade: String,
  status: String,
  date: Date,
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
