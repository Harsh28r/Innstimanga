import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Modal } from '@mui/material';
import { DollarSign, Download } from 'lucide-react';

/**
 * @typedef {Object} PaySlip
 * @property {string} month
 * @property {number} salary
 */

const mockPaySlips = [
  { month: 'March 2024', salary: 5000, status: 'paid', date: '2024-03-30' },
  { month: 'February 2024', salary: 5000, status: 'paid', date: '2024-02-28' },
  { month: 'January 2024', salary: 5000, status: 'paid', date: '2024-01-30' },
];

const PaystubManagement = () => {
    const [feesData, setFeesData] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('paid'); // Default status
    const [feeType, setFeeType] = useState(''); // New state for Fee Type
    const [dueDate, setDueDate] = useState(''); // New state for Due Date
    const [grade, setGrade] = useState(''); // New state for Grade
    const [openModal, setOpenModal] = useState(false); // New state for modal visibility

    useEffect(() => {
        const fetchFeesData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fees');
                
                // Check if the response is OK
                if (!response.ok) {
                    const errorText = await response.text(); // Get the response as text
                    console.error("Error fetching fees data:", response.statusText, errorText);
                    return; // Exit the function if there's an error
                }

                const data = await response.json();
                setFeesData(data);
            } catch (error) {
                console.error("Error fetching fees data:", error);
            }
        };

        fetchFeesData();
    }, []);

    const handleAddFee = async (e) => {
        e.preventDefault();
        const newFee = { 
            studentName, 
            amount: Number(amount), 
            status, 
            feeType, // Include Fee Type
            dueDate, // Include Due Date
            grade // Include Grade
        };

        try {
            const response = await fetch('http://localhost:5000/api/fees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFee), // Send the newFee object to the API
            });

            if (response.ok) {
                const createdFee = await response.json();
                setFeesData((prev) => [...prev, createdFee]);
                setStudentName('');
                setAmount('');
                setStatus('paid');
                setFeeType(''); // Reset Fee Type
                setDueDate(''); // Reset Due Date
                setGrade(''); // Reset Grade
            } else {
                console.error("Error adding fee:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding fee:", error);
        }
    };

    const handleDownload = () => {
        // Logic to download paystub
        console.log("Download paystub");
    };

    const handleAction = (fee) => {
        // Logic for the action button
        console.log("Action for fee:", fee);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleOpenModal = () => setOpenModal(true); // Function to open modal
    const handleCloseModal = () => setOpenModal(false); // Function to close modal

    return (
        <Container className="paystub-container" sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom className="header-title" sx={{ fontWeight: 'bold', color: '#333' }}>
                Paystub Management
            </Typography>
            <Typography variant="body1" paragraph className="header-subtitle" sx={{ color: '#555' }}>
                Manage and download paystubs for employees with ease.
            </Typography>
            <div className="add-fees-section" sx={{ marginBottom: 4 }}>
                <Typography variant="h5" gutterBottom className="section-title" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Add Fees Details
                </Typography>
                <form onSubmit={handleAddFee} className="fees-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Student Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        className="input-field"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Fees Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        className="input-field"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Status"
                        select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                        variant="outlined"
                        className="input-field"
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    >
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </TextField>
                    <TextField
                        label="Fee Type"
                        value={feeType}
                        onChange={(e) => setFeeType(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        className="input-field"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        className="input-field"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <TextField
                        label="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        className="input-field"
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    />
                    <Button type="submit" variant="contained" color="primary" className="submit-button" sx={{ alignSelf: 'flex-start', padding: '10px 20px' }}>
                        Add Fee
                    </Button>
                </form>
            </div>
            <div className="fees-details-section" sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom className="section-title" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Student Fees Details
                </Typography>
                <TableContainer className="table-container" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell align="right">Fees Amount</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Fee Type</TableCell>
                                <TableCell align="right">Due Date</TableCell>
                                <TableCell align="right">Grade</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feesData.map((fee, index) => (
                                <TableRow key={index} className="hover:bg-gray-100 transition-colors duration-200">
                                    <TableCell>{fee.studentName}</TableCell>
                                    <TableCell align="right">${fee.amount.toLocaleString()}</TableCell>
                                    <TableCell align="right">{fee.status}</TableCell>
                                    <TableCell align="right">{fee.feeType}</TableCell>
                                    <TableCell align="right">{formatDate(fee.dueDate)}</TableCell>
                                    <TableCell align="right">{fee.grade}</TableCell>
                                    <TableCell align="right">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleDownload(fee)}
                                                sx={{ minWidth: 40, padding: '5px 10px' }}
                                            >
                                                <Download size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {/* Modal for additional information */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="modal-content" sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 2 }}>
                    <h2 id="modal-title">Modal Title</h2>
                    <p id="modal-description">This is a pop-up modal!</p>
                    <Button onClick={handleCloseModal}>Close</Button>
                </div>
            </Modal>
        </Container>
    );
};

export default PaystubManagement;