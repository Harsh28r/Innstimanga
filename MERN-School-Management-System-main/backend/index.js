const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
const Fee = require('./models/Fee') // Import the Fee model
const Enquiry = require('./models/Enquiry.js')
const authRoutes = require('./routes/auth');
const timetableRouter = require('./routes/timetable');
const emailVerificationRoutes = require('./routes/emailVerification'); // Import email verification routes

const { fetchRegisteredData} = require('../backend/controllers/admin-controller.js');


const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

let classes = [
    { id: 1, time: '9:00 AM', subject: 'Math', teacher: 'Mr. Smith' },
    { id: 2, time: '10:00 AM', subject: 'Science', teacher: 'Ms. Johnson' },
    { id: 3, time: '11:00 AM', subject: 'History', teacher: 'Mr. Brown' },
];
app.use('/api/auth', authRoutes);
// Endpoint to get classes
app.get('/api/classes', (req, res) => {
    res.json(classes);
});

//  TimeTableSection
app.use('/api/timetable', timetableRouter);

// // Endpoint to add a new class
// app.post('/api/classes', (req, res) => {
//     const { time, subject, teacher } = req.body;
//     const newClass = { id: classes.length + 1, time, subject, teacher };
//     classes.push(newClass);
//     res.status(201).json(newClass);
// });
app.get('/api/fees', async (req, res) => {
    try {
        const fees = await Fee.find(); // Fetch fees from MongoDB
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fees data" });
    }
});
// //  Enquiry
// app.get('/enquiry', async (req, res) => {
//     try {
//         const enquiries = await Enquiry.find();
//         res.json(enquiries);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching enquiry data" });
//     }
// });


// Institute Reg
app.use('/admin', fetchRegisteredData)


// Routes
app.use('/enquiries', require('./routes/enquiries'));
app.use('/admissions', require('./routes/admissions'));

// ... existing code ...

app.post('/api/fees', async (req, res) => {
    const { studentName, amount, status, feeType, dueDate, grade } = req.body;

    // Validate the incoming data
    if (!studentName || !amount || !status || !feeType || !dueDate || !grade) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newFee = new Fee({
            studentName,
            amount,
            status,
            feeType,
            dueDate,
            grade,
        });

        const savedFee = await newFee.save();
        res.status(201).json(savedFee);
    } catch (error) {
        console.error("Error adding fee:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/enquiry', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate the incoming data
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newEnquiry = new Enquiry({
            name,
            email,
            message,
        });

        const savedEnquiry = await newEnquiry.save();
        res.status(201).json(savedEnquiry);
    } catch (error) {
        console.error("Error adding enquiry:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.use('/api/email-verification', emailVerificationRoutes); // Add email verification routes

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})