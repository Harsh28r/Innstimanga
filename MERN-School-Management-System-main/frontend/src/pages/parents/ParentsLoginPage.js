import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, InputAdornment, Fade } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

const ParentsLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        console.log('Email:', email, 'Password:', password); // Log input values

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            // Log the response for debugging
            console.log('Response:', response);

            const data = await response.json();
            console.log('Response Data:', data); // Log the response data

            if (data.success) {
                // Redirect to the new dashboard page
                navigate('/ParentDashboard');
            } else {
                // Provide more specific error messages based on the response
                setError(data.message || 'Login failed. Please try again.');
                console.error('Login failed:', data.message); // Log the failure reason
            }
        } catch (err) {
            console.error('Login error:', err); // Log the error
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#e0f7fa' }}>
                <div style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
                    <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Login</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ transition: '0.3s', '&:hover': { borderColor: '#3f51b5' } }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ transition: '0.3s', '&:hover': { borderColor: '#3f51b5' } }}
                        />
                        <Button type="submit" disabled={loading} variant="contained" color="primary" style={{ marginTop: '20px', width: '100%', transition: '0.3s', '&:hover': { backgroundColor: '#303f9f' } }}>
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                        {error && <Typography color="error" style={{ marginTop: '10px', textAlign: 'center' }}>{error}</Typography>}
                    </form>
                </div>
            </div>
        </Fade>
    );
};

export default ParentsLoginPage; 