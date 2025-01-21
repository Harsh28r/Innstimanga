import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const ManageInstitutes = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Manage Institutes
                </Typography>
                <Grid container spacing={3}>
                    {/* Add institute management functionality here */}
                </Grid>
            </Paper>
        </Box>
    );
};

export default ManageInstitutes; 