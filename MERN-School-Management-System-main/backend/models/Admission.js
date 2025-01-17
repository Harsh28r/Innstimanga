const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  phone: String,
  email: String,
  grade: String,
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);