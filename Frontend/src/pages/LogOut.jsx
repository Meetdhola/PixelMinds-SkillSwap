import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {    
  localStorage.removeItem("token");
    navigate("/login");   // Redirect to login
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-lg animate-pulse">Logging you out...</p>
    </div>
  );
}
