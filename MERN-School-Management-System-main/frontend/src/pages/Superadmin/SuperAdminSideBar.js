import React from 'react';
import { Link } from 'react-router-dom';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const SuperAdminSideBar = () => {
    const listItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/SuperAdmin/dashboard'
        },
        {
            text: 'Profile',
            icon: <PersonIcon />,
            path: '/SuperAdmin/profile'
        },
        {
            text: 'Manage Institutes',
            icon: <SchoolIcon />,
            path: '/SuperAdmin/institutes'
        },
        {
            text: 'Add Institute',
            icon: <AddBusinessIcon />,
            path: '/SuperAdmin/add-institute'
        },
        {
            text: 'Settings',
            icon: <SettingsIcon />,
            path: '/SuperAdmin/settings'
        },
        {
            text: 'Logout',
            icon: <LogoutIcon />,
            path: '/logout'
        }
    ];

    return (
        <>
            {listItems.map((item) => (
                <ListItem button component={Link} to={item.path} key={item.text}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </>
    );
};

export default SuperAdminSideBar;