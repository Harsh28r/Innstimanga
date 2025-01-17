import { useState, useEffect } from 'react';
import { Building2, BarChart3, User, UserPlus } from 'lucide-react';
import { InstitutesList } from './InstitutesList';
import  AdminDashboard  from '../admin/AdminDashboard.js';
import { Institute } from '../../types/auth.js';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'institutes', label: 'Institutes', icon: <Building2 size={20} /> },
  { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} /> },
];

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState('institutes');
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [admins, setAdmins] = useState([]);

  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { teachersList } = useSelector((state) => state.teacher);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllStudents())
      .catch(error => {
        // Handle the error here
        console.error('An error occurred while getting all students:', error);
      });
    dispatch(getAllTeachers())
      .catch(error => {
        // Handle the error here
        console.error('An error occurred while getting all teachers:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    fetch('http://localhost:5000/Admin')
      .then(response => response.json())
      .then(data => setAdmins(data));
  }, []);

  // Reset selected institute when switching to institutes tab
  const handleTabChange = (tabId) => {
    if (tabId === 'institutes') {
      setSelectedInstitute(null);
    }
    setActiveTab(tabId);
  };

  // When an institute is selected, switch to overview tab
  const handleInstituteSelect = (institute) => {
    setSelectedInstitute(institute);
    setActiveTab('overview');
  };

  const handleManageInstitute = (institute) => {
    setActiveTab('overview');
    setSelectedInstitute(institute);
    navigate(`/superadmin/dashboard/${institute._id}`);
  };

  return (
    <div className="h-[calc(100vh-73px)]" style={{ backgroundColor: 'white' }}>
      {/* Top Navigation */}
      <div className="bg-white border-b" style={{ padding: '10px' }}>
        <div className="flex items-center space-x-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 py-4 px-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ backgroundColor: 'lightgreen' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      Manage your Institute
      <div className={`${styles.cardContainer} p-6 grid  grid-cols-3 gap-4`} style={{ backgroundColor: 'lightgrey' }}>
        {/* {activeTab === 'institutes' && (
          <InstitutesList onSelectInstitute={handleInstituteSelect} />
        )} */}
        {activeTab === 'overview' && selectedInstitute && (
          <AdminDashboard instituteId={selectedInstitute.id} handleManageInstitute={handleManageInstitute} />
        )}
       
        {admins.length > 0 ? (
          <div className="flex flex-wrap">
            {admins.map(admin => (
              <div key={admin._id} className={`${styles.individualCard} w-1/4`}>
                <p><Building2 size={20} />  {admin.schoolName}</p>
                <p>Location: {admin.instituteAddress}</p>
                <p><User size={20} /> Parents:{admin.teachers} </p>
                <p> <UserPlus size={20} />Students: {admin.students} </p>
                {activeTab === 'overview' && selectedInstitute && (
                  <div className="bg-white border-b px-6 py-3" style={{ padding: '10px' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {selectedInstitute.name}
                        </h2>
                        <p className="text-sm text-gray-500">{selectedInstitute.location}</p>
                        <p>ID: {selectedInstitute._id}</p>
                        <p>
                          <Building2 size={20} /> {selectedInstitute.schoolName}
                        </p>
                        <p>Location: {selectedInstitute.instituteAddress}</p>
                        <p>Teachers: {teachersList.length} <User size={20} /></p>
                        <p>Students: {studentsList.length} <UserPlus size={20} /></p>
                      </div>
                      <button
                        onClick={() => setSelectedInstitute(null)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                        style={{ backgroundColor: 'lightcoral' }}
                      >
                        Change Institute
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => handleManageInstitute(admin)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                  style={{ backgroundColor: 'lightcoral' }}
                >
                  Manage Institute
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

SuperAdmin.propTypes = {
  // Add any necessary prop types here
};
