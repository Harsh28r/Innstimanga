import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SuperAdminProfile = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Super Admin Profile
                </Typography>
                {/* Add profile information and edit functionality here */}
            </Paper>
        </Box>
    );
};

export default SuperAdminProfile;