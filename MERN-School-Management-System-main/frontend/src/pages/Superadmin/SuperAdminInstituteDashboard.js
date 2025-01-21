import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  User, 
  UserPlus, 
  Book, 
  DollarSign, 
  Settings, 
  ChevronLeft,
  BarChart 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Update import paths to match the current directory structure
import AddStudent from '../admin/studentRelated/AddStudent';
import AddTeacher from '../admin/teacherRelated/AddTeacher';
import AddSubject from '../admin/subjectRelated/ShowSubjects';
import ManageClasses from '../admin/classRelated/AddClass';
import AddFees from '../admin/PaystubManagement';
import NoticeBoard from '../admin/noticeRelated/AddNotice';

export default function SuperAdminInstituteDashboard({ 
  institute, 
  onBack 
}) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [instituteCounts, setInstituteCounts] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    classes: 0
  });
  const navigate = useNavigate();

  // Fetch institute-specific counts
  useEffect(() => {
    const fetchInstituteCounts = async () => {
      try {
        // Replace with actual API endpoints
        const [studentsRes, teachersRes, subjectsRes, classesRes] = await Promise.all([
          fetch(`http://localhost:5000/students/count/${institute._id}`),
          fetch(`http://localhost:5000/teachers/count/${institute._id}`),
          fetch(`http://localhost:5000/subjects/count/${institute._id}`),
          fetch(`http://localhost:5000/classes/count/${institute._id}`)
        ]);

        const students = await studentsRes.json();
        const teachers = await teachersRes.json();
        const subjects = await subjectsRes.json();
        const classes = await classesRes.json();

        setInstituteCounts({ students, teachers, subjects, classes });
      } catch (error) {
        console.error('Error fetching institute counts:', error);
      }
    };

    fetchInstituteCounts();
  }, [institute._id]);

  // Sidebar navigation for super admin institute control
  const sidebarMenus = [
    { 
      id: 'dashboard',
      label: 'Dashboard', 
      icon: <BarChart />,
      component: null
    },
    { 
      id: 'students', 
      label: 'Manage Students', 
      icon: <User />,
      component: AddStudent
    },
    { 
      id: 'teachers', 
      label: 'Manage Teachers', 
      icon: <UserPlus />,
      component: AddTeacher
    },
    { 
      id: 'subjects', 
      label: 'Manage Subjects', 
      icon: <Book />,
      component: AddSubject
    },
    { 
      id: 'classes', 
      label: 'Manage Classes', 
      icon: <Settings />,
      component: ManageClasses
    },
    { 
      id: 'fees', 
      label: 'Manage Fees', 
      icon: <DollarSign />,
      component: AddFees
    },
    { 
      id: 'notices', 
      label: 'Notice Board', 
      icon: <Settings />,
      component: NoticeBoard
    }
  ];

  // Render active section component
  const renderActiveSection = () => {
    if (activeSection === 'dashboard') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Students</h3>
            <p className="text-3xl font-bold">{instituteCounts.students}</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Teachers</h3>
            <p className="text-3xl font-bold">{instituteCounts.teachers}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Subjects</h3>
            <p className="text-3xl font-bold">{instituteCounts.subjects}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Classes</h3>
            <p className="text-3xl font-bold">{instituteCounts.classes}</p>
          </div>
        </div>
      );
    }

    const ActiveComponent = sidebarMenus.find(
      menu => menu.id === activeSection
    )?.component;

    return ActiveComponent ? (
      <ActiveComponent 
        institute={institute} 
        isSuperAdminView={true} 
      />
    ) : null;
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r">
        <button 
          onClick={onBack} 
          className="flex items-center mb-4 text-blue-600"
        >
          <ChevronLeft /> Back to Institutes
        </button>

        <div className="space-y-2">
          <div className="text-xl font-bold mb-4">
            {institute.schoolName}
          </div>
          {sidebarMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveSection(menu.id)}
              className={`w-full text-left p-2 rounded flex items-center ${
                activeSection === menu.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              {menu.icon}
              <span className="ml-2">{menu.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        {renderActiveSection()}
      </div>
    </div>
  );
}

SuperAdminInstituteDashboard.propTypes = {
  institute: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    schoolName: PropTypes.string.isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired
};
