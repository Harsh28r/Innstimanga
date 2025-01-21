import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';

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
    const { instituteId } = useParams();
    const basePath = instituteId ? `/admin/${instituteId}` : '/Admin';

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to={`${basePath}`}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === basePath ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/classes`}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.includes('/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/subjects`}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/teachers`}>
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/students`}>
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.includes('/students') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/notices`}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/complains`}>
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/timetable`}>
                    <ListItemIcon>
                        <SchoolIcon color={location.pathname.startsWith("/timetable") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Timetable" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/online-lecture`}>
                    <ListItemIcon>
                        <LiveTvIcon color={location.pathname.startsWith("/online-lecture") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Online Lecture" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/lead-management`}>
                    <ListItemIcon>
                        <AssignmentIndIcon color={location.pathname.startsWith("/lead-management") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Lead Management" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/paystub`}>
                    <ListItemIcon>
                        <ReceiptIcon color={location.pathname.startsWith("/paystub") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Paystub Management" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/inventory`}>
                    <ListItemIcon>
                        <InventoryIcon color={location.pathname.startsWith("/inventory") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Inventory" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/enquiry-form`}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/enquiry-form") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Enquiry Form" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/resource-management`}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/resource-management") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Resource Management" />
                </ListItemButton>
                <ListItemButton component={Link} to={`${basePath}/question-paper-maker`}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/question-paper-maker") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Question Paper Maker" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
        </>
    )
}

export default SideBar
