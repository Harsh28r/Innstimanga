import React from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

const AddInstitute = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Institute
                </Typography>
                {/* Add institute creation form here */}
            </Paper>
        </Box>
    );
};

export default AddInstitute;
