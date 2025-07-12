import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import RequestModal from "./components/ui/RequestModal";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
// import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard"
import EditProfile from "./pages/EditProfile"
import Requests from "./pages/Requests"
import BrowseSkill from "./pages/SkillBrowse"
import LogOut from "./pages/LogOut"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/signup" element={<AuthPage />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-requests" element={<Requests />} />
            <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<BrowseSkill/>} />
          </Route>

          <Route path="*" element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
