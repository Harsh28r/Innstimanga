import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import ParentsRegisterPage from "./pages/parents/ParentsRegisterPage";
import ChooseUser from "./pages/ChooseUser";
import SuperAdminDashboard from "./pages/Superadmin/SuperDashboard";
import SuperAdmin from "./pages/Superadmin/superadmin";
import SuperAdminLoginForm from "./pages/SuperAdminLogin";
import ParentsLoginPage from "./pages/parents/ParentsLoginPage";
import ParentDashboard from "./pages/parents/ParentsDasboard";
import StudentRegister from "./pages/student/StudentRegister";

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  console.log(currentRole)

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route
            path="/chooseasguest"
            element={<ChooseUser visitor="guest" />}
          />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher " />} />
          {/* <Route path="/Parentslogin" element={<LoginPage role=" Parent"  />} /> */}

          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          <Route path="/StudentRegister" element={<StudentRegister />} />
          <Route path="/Parentsregister" element={<ParentsRegisterPage />} />
          <Route path="/Super" element={<SuperAdmin />} />
          <Route
            path="/superadmin/dashboard/:id/*"
            element={<SuperAdminDashboard />}
          />

          <Route path="/superadminlogin/*" element={<SuperAdminLoginForm />} />

          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/SuperAdminDashboard/*"
            element={<SuperAdminDashboard />}
          />
          <Route path="/ParentsLogin" element={<ParentsLoginPage />} />
          <Route path="/ParentDashboard" element={<ParentDashboard />} />
        </Routes>
      )}

      {currentRole === "Admin" && (
        <>
          <AdminDashboard />
        </>
      )}

      {currentRole === "Student" && (
        <>
          <StudentDashboard />
        </>
      )}

      {currentRole === "Teacher" && (
        <>
          <TeacherDashboard />
        </>
      )}

      {currentRole === "Parents" && (
        <>
          <TeacherDashboard />
        </>
      )}
      {currentRole === "superadmin" && (
        <>
          <SuperAdminDashboard />
        </>
      )}
    </Router>
  );
};

export default App;
