const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: String,
  time: String,
  grade: String,
  section: String,
  subject: String,
  teacher: String,
  room: String,
});

module.exports = mongoose.model('Timetable', timetableSchema);