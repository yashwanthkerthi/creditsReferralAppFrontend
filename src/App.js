import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRegisterForm from "./pages/admin/AdminRegisterForm/AdminRegisterForm";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AddUsersForm from "./pages/admin/AddUsersForm/AddUsersForm";
import AdminLoginForm from "./pages/admin/AdminLoginForm/AdminLoginForm";
import AdminHome from "./pages/admin/AdminHome/AdminHome";
import UserRegisterForm from "./pages/user/UserRegisterForm/UserRegisterForm";
import UserLoginForm from "./pages/user/UserLoginForm/UserLoginForm";
import UserHome from "./pages/user/UserHome/UserHome";
import UserDashboard from "./pages/user/UserDashboard/UserDashboard";

const Roles = {
  ADMIN: "admin",
  USER: "user",
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/" element={<AdminLoginForm />} />
        <Route exact path="/user/login" element={<UserLoginForm />} />
        <Route exact path="/admin/register/:code" element={<AdminRegisterForm />} />
        <Route exact path="/user/register" element={<UserRegisterForm />} />

        {/* <Route element={<ProtectedRoute allowedRoles={Roles.ADMIN} />}> */}
          {/* <Route exact path="admin/home" element={<AdminHome />} /> */}
          <Route exact path="admin/add-users" element={<AddUsersForm />} />
          <Route exact path="admin/dashboard" element={<AdminDashboard />} />
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute allowedRoles={Roles.USER} />}> */}
          {/* <Route exact path="user/home" element={<UserHome />} /> */}
          <Route exact path="user/dashboard" element={<UserDashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
