// routes/timetable.js
const express = require('express');
const router = express.Router();
const Timetable = require('../models/TimetableSchema');
const mongoose = require('mongoose');

// Sample data for timetable
let timetable = [
    { id: 1, day: 'Monday', subject: 'Math', time: '9:00 AM', teacher: 'Mr. Smith', room: '101' },
    { id: 2, day: 'Tuesday', subject: 'Science', time: '10:00 AM', teacher: 'Ms. Johnson', room: '102' },
    { id: 3, day: 'Wednesday', subject: 'History', time: '11:00 AM', teacher: 'Mr. Brown', room: '103' },
    { id: 4, day: 'Thursday', subject: 'Art', time: '1:00 PM', teacher: 'Ms. Green', room: '104' }
];

// Endpoint to get the timetable
router.get('/', (req, res) => {
    res.json(timetable);
});

// Endpoint to add a new timetable entry
router.post('/', (req, res) => {
    const { day, subject, time, teacher, room } = req.body;
    const newEntry = { id: timetable.length + 1, day, subject, time, teacher, room };
    timetable.push(newEntry);
    res.status(201).json(newEntry);
});

// Endpoint to update a timetable entry
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { day, subject, time, teacher, room } = req.body;
    const entry = timetable.find(item => item.id === parseInt(id));

    if (entry) {
        entry.day = day;
        entry.subject = subject;
        entry.time = time;
        entry.teacher = teacher;
        entry.room = room;
        res.json(entry);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

// DELETE route to remove a timetable entry by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete timetable entry with ID: ${id}`);
    
    // Log the current state of the timetable
    console.log('Current timetable:', timetable);

    // Find the index of the entry with the given ID
    const index = timetable.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        timetable.splice(index, 1);
        console.log(`Timetable entry with ID: ${id} deleted successfully`);
        res.status(200).json({ message: 'Timetable entry deleted successfully' });
    } else {
        console.warn(`Timetable entry with ID: ${id} not found`);
        res.status(404).json({ message: 'Timetable entry not found' });
    }
});

module.exports = router;
