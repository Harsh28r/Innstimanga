const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  phone: String,
  email: String,
  grade: String,
  status: String,
  date: Date,
  documents: [String],
});

module.exports = mongoose.model('Admission', admissionSchema);