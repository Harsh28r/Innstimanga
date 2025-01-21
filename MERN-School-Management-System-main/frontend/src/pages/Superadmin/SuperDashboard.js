import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './Sidebar';
import AdminProfile from '../admin/AdminProfile';
import SuperAdminHomePage from './superadminHome'

import AddStudent from '../admin/studentRelated/AddStudent';
import SeeComplains from '../admin/studentRelated/SeeComplains';
import ShowStudents from '../admin/studentRelated/ShowStudents';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import ViewStudent from '../admin/studentRelated/ViewStudent';

import AddNotice from '../admin/noticeRelated/AddNotice';
import ShowNotices from '../admin/noticeRelated/ShowNotices';

import ShowSubjects from '../admin/subjectRelated/ShowSubjects';
import SubjectForm from '../admin/subjectRelated/SubjectForm';
import ViewSubject from '../admin/subjectRelated/ViewSubject';

import AddTeacher from '../admin/teacherRelated/AddTeacher';
import ChooseClass from '../admin/teacherRelated/ChooseClass';
import ChooseSubject from '../admin/teacherRelated/ChooseSubject';
import ShowTeachers from '../admin/teacherRelated/ShowTeachers';
import TeacherDetails from '../admin/teacherRelated/TeacherDetails';

import AddClass from '../admin/classRelated/AddClass';
import ClassDetails from '../admin/classRelated/ClassDetails';
import ShowClasses from '../admin/classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

import Timetable from '../admin/Timetable';
import OnlineLectureLink from '../admin/OnlineLectureLink';
import LeadManagement from '../admin/LeadManagement';
import PaystubManagement from '../admin/PaystubManagement';
import Inventory from '../admin/Inventory';
import AdmissionForm from '../admin/AdmissionForm';
import EnquiryForm from '../admin/EnquiryForm';
import ResourceManagement from '../admin/ResourceManagement';
import QuestionPaperMaker from '../admin/QuestionPaperMaker';
import TimetableIcon from '@mui/icons-material/AccessTime';
import OnlineLectureIcon from '@mui/icons-material/VideoCall';
import LeadManagementIcon from '@mui/icons-material/GroupAdd';
import PaystubIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdmissionFormIcon from '@mui/icons-material/Assignment';
import EnquiryFormIcon from '@mui/icons-material/QuestionAnswer';
import ResourceManagementIcon from '@mui/icons-material/Storage';
import QuestionPaperIcon from '@mui/icons-material/Description';
import axios from 'axios';

const SuperAdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [institutes, setInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        // Fetch all institutes
        const fetchInstitutes = async () => {
            try {
                const response = await axios.get('/api/institutes');
                setInstitutes(response.data);
            } catch (error) {
                console.error('Error fetching institutes', error);
            }
        };

        fetchInstitutes();
    }, []);

    const handleInstituteSelect = (institute) => {
        // Navigate to the specific institute's admin dashboard
        navigate(`/admin/dashboard/${institute._id}`, { 
            state: { 
                institute, 
                adminUser: {
                    role: 'superadmin',
                    assignedInstitutes: [institute._id]
                }
            } 
        });
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Super Admin Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/SuperAdminHome" element={<SuperAdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />

                        {/* New Features */}
                        <Route path="/Admin/timetable" element={<Timetable />} />
                        <Route path="/Admin/online-lecture" element={<OnlineLectureLink />} />
                        <Route path="/Admin/lead-management" element={<LeadManagement />} />
                        <Route path="/Admin/paystub" element={<PaystubManagement />} />
                        <Route path="/Admin/inventory" element={<Inventory />} />
                        {/* <Route path="/Admin/admission-form" element={<AdmissionForm />} /> */}
                        <Route path="/Admin/enquiry-form" element={<EnquiryForm />} />
                        <Route path="/Admin/resource-management" element={<ResourceManagement />} />
                        <Route path="/Admin/question-paper-maker" element={<QuestionPaperMaker />} />
                        {/* <Route path="/Admin/notifications" element={<Notifications />} /> */}
                    </Routes>
                    <Grid container spacing={3} sx={{ padding: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Manage Institutes</Typography>
                        </Grid>
                        {institutes.map(institute => (
                            <Grid item xs={12} md={4} key={institute._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{institute.schoolName}</Typography>
                                        <Typography variant="body2">{institute.instituteAddress}</Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            onClick={() => handleInstituteSelect(institute)}
                                        >
                                            Access Dashboard
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default SuperAdminDashboard;

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}