import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../../assets/designlogin.jpg";
import { LightPurpleButton } from "../../components/buttonStyles";
// import { registerUser } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
// import Popup from "../../components/Popup";
import axios from "axios";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { auth } from "../../firebaseConfig";

const defaultTheme = createTheme();

const StudentRegister = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [institutes, setInstitues] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    school: "",
    aadharNumber: "",
    password: "",
  });

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(studentDetails);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/StudentRegister`,
        studentDetails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(result);

      if (result.status === 200) {
        setLoader(false);
        alert(`${result.data.message}`);
        navigate("/Studentlogin");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAllInstitutes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin`
      );
      setInstitues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllInstitutes();
  }, []);

  const instituteOptions = institutes.map((institute) => {
    return (
      <MenuItem
        style={{ cursor: "pointer", p: 3 }}
        key={institute._id}
        value={institute._id}
      >
        {institute.schoolName}
      </MenuItem>
    );
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              Institute Student Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentName"
                label="Enter your name"
                name="name"
                autoComplete="name"
                autoFocus
                // error={adminNameError}
                // helperText={adminNameError && "Name is required"}
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
                // error={emailError}
                // helperText={emailError && "Email is required"}
                onChange={handleInputChange}
              />
              <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Select Institue
                </InputLabel>
                <Select
                  name="school"
                  value={studentDetails.school}
                  onChange={handleInputChange}
                >
                  {instituteOptions}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Enter Aadhar Number"
                name="aadharNumber"
                autoComplete="aadharNumber"
                // error={emailError}
                // helperText={emailError && "Email is required"}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                // error={passwordError}
                // helperText={passwordError && "Password is required"}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid>Already have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to="/Studentlogin">Log in</StyledLink>
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
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      {/* <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      /> */}
    </ThemeProvider>
  );
};

export default StudentRegister;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
