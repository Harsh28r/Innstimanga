import React, { useState, useEffect } from 'react';
import { Building2, BarChart3, User, UserPlus } from 'lucide-react';
import { InstitutesList } from './InstitutesList';
import AdminDashboard from '../admin/AdminDashboard';
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

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('institutes');
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [studentsError, setStudentsError] = useState(null);
  const [teachersError, setTeachersError] = useState(null);

  const dispatch = useDispatch();
  const { studentsList, loading: studentsLoading } = useSelector((state) => state.student);
  const { teachersList, loading: teachersLoading } = useSelector((state) => state.teacher);
  const [adminsWithCounts, setAdminsWithCounts] = useState([]);

  const navigate = useNavigate();

  const studentData = useSelector((state) => state.student.studentData);
  const studentId = studentData?._id;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await dispatch(getAllStudents());
        if (result?.payload) {
          console.log('Fetched Students:', result.payload);
        } else {
          console.error('Students fetch failed', result);
          setStudentsError({
            message: 'Failed to fetch students',
            status: result?.error ? result.error.status : null
          });
        }
      } catch (error) {
        console.error('Students Fetch Error:', error);
        setStudentsError({
          message: error.message || 'Failed to fetch students',
          status: error.response?.status
        });
      }
    };

    const fetchTeachers = async () => {
      try {
        const result = await dispatch(getAllTeachers());
        if (result?.payload) {
          console.log('Fetched Teachers:', result.payload);
        } else {
          console.error('Teachers fetch failed', result);
          setTeachersError({
            message: 'Failed to fetch teachers',
            status: result?.error ? result.error.status : null
          });
        }
      } catch (error) {
        console.error('Teachers Fetch Error:', error);
        setTeachersError({
          message: error.message || 'Failed to fetch teachers',
          status: error.response?.status
        });
      }
    };

    fetchStudents();
    fetchTeachers();
  }, [dispatch]);

  useEffect(() => {
    console.log('Students List:', studentsList);
    console.log('Teachers List:', teachersList);

    fetch('http://localhost:5000/Admin')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(admins => {
        console.log('Raw Admins:', admins);
        console.log('Admins Type:', typeof admins);
        console.log('Admins Length:', admins.length);
        
        const enrichedAdmins = admins.map(admin => {
          if (!admin || !admin._id) {
            console.warn('Encountered invalid admin:', admin);
            return null;
          }

          return {
            ...admin,
            students: studentsList ? 
              studentsList.filter(student => 
                student?.school && student.school === admin._id
              ).length : 0,
            teachers: teachersList ? 
              teachersList.filter(teacher => 
                teacher?.school && teacher.school === admin._id
              ).length : 0
          };
        }).filter(admin => admin !== null);

        console.log('Enriched Admins:', enrichedAdmins);
        setAdminsWithCounts(enrichedAdmins);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  }, [studentsList, teachersList]);

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
    // setActiveTab('overview');
  };

  const handleBack = () => {
    setSelectedInstitute(null);
  };

  // Error handling for students and teachers
  if (studentsError) {
    console.error('Students Fetch Error:', studentsError);
  }

  if (teachersError) {
    console.error('Teachers Fetch Error:', teachersError);
  }

  if (selectedInstitute) {
    return (
      <AdminDashboard 
        institute={selectedInstitute} 
        onBack={handleBack}
      />
    );
  }

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
      {activeTab === 'overview' && selectedInstitute ? (
        <AdminDashboard 
          institute={selectedInstitute} 
          onBack={() => setActiveTab('institutes')} 
        />
      ) : (
        <div 
          className={`${styles.cardContainer} p-6 grid grid-flow-col auto-cols-max gap-8`} 
          style={{ 
            backgroundColor: 'lightgrey', 
            overflowX: 'auto',
            columnGap: '2rem'
          }}
        >
          {adminsWithCounts.length > 0 ? (
            adminsWithCounts.map(admin => {
              if (!admin) {
                console.warn('Skipping null admin in rendering');
                return null;
              }
              
              return (
                <div 
                  key={admin._id} 
                  className={`${styles.individualCard} w-64 flex-shrink-0`}
                >
                  <p><Building2 size={20} />  {admin.schoolName || 'Unnamed Institute'}</p>
                  <p>Location: {admin.instituteAddress || 'No address provided'}</p>
                  <p><User size={20} /> Teachers: {admin.teachers || 0} </p>
                  <p> <UserPlus size={20} />Students: {admin.students || 0} </p>
                  <button
                    onClick={() => handleInstituteSelect(admin)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                    style={{ backgroundColor: 'lightcoral' }}
                  >
                    Manage Institute
                  </button>
                </div>
              );
            }).filter(Boolean)
          ) : (
            <p>No institutes found or loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

SuperAdmin.propTypes = {
  // Add any necessary prop types here
};

export default SuperAdmin;
