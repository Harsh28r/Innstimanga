import React from 'react';
import { useLocation } from 'react-router-dom';

const InstituteContextWrapper = ({ children }) => {
    const location = useLocation();
    const instituteData = location.state?.institute;
    
    if (!instituteData) {
        return <div>No institute data found</div>;
    }
    
    return (
        <div className="institute-context">
            <div className="institute-header">
                <h2>{instituteData.schoolName}</h2>
            </div>
            {children}
        </div>
    );
};

export default InstituteContextWrapper; 