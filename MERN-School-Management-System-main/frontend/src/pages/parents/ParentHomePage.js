import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Student from "../../assets/students.svg"; // Example asset
import Attendance from "../../assets/assignment.svg"; 

const ParentHomePage = () => {
    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector((state) => state.user);
    const [studentCount, setStudentCount] = useState(0); // Example state for student count

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Parent"));
        // Fetch additional data as needed
    }, [dispatch, currentUser._id]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <StyledPaper>
                        <img src={Student} alt="Students" />
                        <Title>Total Students</Title>
                        <Data start={0} end={studentCount} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <StyledPaper>
                        <img src={Attendance} alt="Attendance" />
                        <Title>Overall Attendance</Title>
                        <Data start={0} end={95} duration={4} /> {/* Example attendance percentage */}
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default ParentHomePage;