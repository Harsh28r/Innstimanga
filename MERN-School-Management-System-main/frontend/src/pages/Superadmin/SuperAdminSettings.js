import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SuperAdminSettings = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    System Settings
                </Typography>
                {/* Add settings configuration options here */}
            </Paper>
        </Box>
    );
};

export default SuperAdminSettings; 