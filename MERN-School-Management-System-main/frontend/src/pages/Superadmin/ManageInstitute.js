import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const ManageInstitute = () => {
    const { adminId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [instituteDetails, setInstituteDetails] = useState(null);

    useEffect(() => {
        const fetchInstituteDetails = async () => {
            try {
                const response = await axios.get(`/admin/getSuperAdminAccess/${adminId}`);
                
                if (response.data.success) {
                    setInstituteDetails(response.data.admin);
                    // Automatically navigate to the admin dashboard
                    navigate(`/manage-institute/${adminId}/dashboard`);
                } else {
                    // Handle error case
                    console.error('Failed to fetch institute details');
                }
            } catch (error) {
                console.error('Error fetching institute details:', error);
            }
        };

        fetchInstituteDetails();
    }, [adminId, navigate]);

    const handleManageClick = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Store institute data in localStorage
            const adminData = {
                _id: instituteDetails._id,
                name: instituteDetails.name,
                email: instituteDetails.email,
                schoolName: instituteDetails.schoolName,
                instituteAddress: instituteDetails.instituteAddress,
                role: 'Admin'
            };

            localStorage.setItem('admin', JSON.stringify(adminData));
            localStorage.setItem('superadminMode', 'true');
            localStorage.setItem('currentInstituteId', instituteDetails._id);
            
            // Navigate to the specific institute's admin dashboard
            navigate(`/admin/${instituteDetails._id}`);
            
        } catch (error) {
            console.error("Error accessing institute:", error);
            setError('Failed to access institute dashboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.instituteCard}>
            <h3>{instituteDetails?.schoolName}</h3>
            <p>{instituteDetails?.email}</p>
            <p>{instituteDetails?.instituteAddress}</p>
            {error && <p className={styles.error}>{error}</p>}
            <button 
                className={styles.manageButton}
                onClick={handleManageClick}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Manage Institute'}
            </button>
        </div>
    );
};

export default ManageInstitute; 