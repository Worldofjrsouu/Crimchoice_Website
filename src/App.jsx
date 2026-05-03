import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ManageCourses from "./manageCourses";
import Users from "./users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/AdminDashboard" />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/manageCourses" element={<ManageCourses />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;