import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
// import { registerUser } from '../../redux/ParentsRelated/ParentsHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // Import Firebase Auth

const defaultTheme = createTheme();

const ParentsRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [childRollNoError, setChildRollNoError] = useState(false);
    const [aadharNoError, setAadharNoError] = useState(false);
    const role = "Admin"

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const childRollNo = event.target.childRollNo.value;
        const aadharNo = event.target.aadharNo.value;

        const role = "Parent";

        console.log("Form Data:", { name, email, password, role, childRollNo, aadharNo });

        if (!name || !email || !password || !childRollNo || !aadharNo) {
            console.log("Form data incomplete. Please fill in all fields.");
            return;
        }

        const fields = { name, email, password, role, childRollNo, aadharNo };
        setLoader(true);

        try {
            const auth = getAuth(); // Initialize Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create user with Firebase
            const user = userCredential.user;

            // Check if user is valid and send email verification
            if (user) {
                await sendEmailVerification(user); // Use the correct method for email verification
                console.log("Verification email sent to:", email);

                // Send user data to your API
                const apiResponse = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(fields),
                });

                const apiData = await apiResponse.json();
                console.log("API response:", apiData);
            }

            // User registered
            console.log("User registered:", user);
            setMessage("Registration successful. Please check your email for verification.");
            setTimeout(() => {
                navigate('/ParentsLogin'); // Redirect to login page after 2 seconds
            }, 2000);
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage(error.message);
        }

        setLoader(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'childRollNo') setChildRollNoError(false);
        if (name === 'aadharNo') setAadharNoError(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const rollNumber = event.target.rollNumber.value;
        const studentName = event.target.studentName.value;

        console.log("Submitting login with fields:", { email, password, rollNumber, studentName, role: 'Parent' });

        if (!email || !password) {
            console.log("Login data incomplete. Please fill in all fields.");
            return;
        }

        const fields = { email, password, rollNumber, studentName };
        setLoader(true);

        try {
            console.log("Attempting to login with data:", fields);
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            }).then(res => res.json());

            console.log("Login response:", response);

            if (response.success) {
                setMessage("Login successful");
                // Handle successful login (e.g., navigate to dashboard)
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("An error occurred during login");
        }

        setLoader(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            Parents Register
                        </Typography>
                        <Typography variant="h7">
                            Create your own school by registering as an admin.
                            <br />
                            You will be able to add students and faculty and
                            manage the system.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your name"
                                name="adminName"
                                autoComplete="name"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="childRollNo"
                                label="Enter child's Roll Number"
                                name="childRollNo"
                                autoComplete="off"
                                error={childRollNoError}
                                helperText={childRollNoError && 'Child Roll Number is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="aadharNo"
                                label="Enter parent's Aadhar Number"
                                name="aadharNo"
                                autoComplete="off"
                                error={aadharNoError}
                                helperText={aadharNoError && 'Aadhar Number is required'}
                                onChange={handleInputChange}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
                            </LightPurpleButton>
                            <Grid container>
                                <Grid>
                                    Already have an account?
                                </Grid>
                                <Grid item sx={{ ml: 2 }}>
                                    <StyledLink to="/ParentsLogin">
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default ParentsRegisterPage

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;




