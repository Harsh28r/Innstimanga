import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import  ParentsRegisterPage  from './pages/parents/ParentsRegisterPage'
import ChooseUser from './pages/ChooseUser';
import SuperAdminDashboard from './pages/Superadmin/superadminDashboard'

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher " />} />
          <Route path="/Parentslogin" element={<LoginPage role=" Parent" />} />


          <Route path="/Adminregister" element={<AdminRegisterPage  />} />
          <Route path="/Parentsregister" element={<  ParentsRegisterPage />} />
          {/* <Route path="/ Super-AdminDashboard" element={<   SuperAdminDashboard/>} /> */}

          

          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/SuperAdminDashboard/*" element={<SuperAdminDashboard />} />
        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
      
      {currentRole === "Parents" &&
        <>
          <TeacherDashboard />
          
        </>
      }
       {currentRole === "superadmin" &&
        <>
       
          <   SuperAdminDashboard/>
        </>
      }
    </Router>
  )
}

export default App