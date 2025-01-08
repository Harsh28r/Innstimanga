import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SchoolIcon from '@mui/icons-material/School';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/timetable">
                    <ListItemIcon>
                        <SchoolIcon color={location.pathname.startsWith("/Admin/timetable") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Timetable" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/online-lecture">
                    <ListItemIcon>
                        <LiveTvIcon color={location.pathname.startsWith("/Admin/online-lecture") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Online Lecture" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/lead-management">
                    <ListItemIcon>
                        <AssignmentIndIcon color={location.pathname.startsWith("/Admin/lead-management") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Lead Management" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/paystub">
                    <ListItemIcon>
                        <ReceiptIcon color={location.pathname.startsWith("/Admin/paystub") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Paystub Management" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/inventory">
                    <ListItemIcon>
                        <InventoryIcon color={location.pathname.startsWith("/Admin/inventory") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Inventory" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Admin/admission-form">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/admission-form") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Admission Form" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Admin/enquiry-form">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/enquiry-form") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Enquiry Form" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/resource-management">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/resource-management") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Resource Management" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/question-paper-maker">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/question-paper-maker") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Question Paper Maker" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Admin/notifications"> */}
                {/*     <ListItemIcon> */}
                {/*         <NotificationsIcon color={location.pathname.startsWith("/Admin/notifications") ? 'primary' : 'inherit'} /> */}
                {/*     </ListItemIcon> */}
                {/*     <ListItemText primary="Notifications" /> */}
                {/* </ListItemButton> */}
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
           
        </>
    )
}

export default SideBar
