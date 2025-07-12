// components/ui/Sidebar.jsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function Sidebar({ onLogout, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout(); // performs logout
    navigate("/login");       // redirects after logout
  };

  const isAdmin = user?.role === "admin";

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/admin", label: "Admin Panel" },
  ];

  const userLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/my-requests", label: "My Requests" },
    { to: "/edit-profile", label: "Edit Profile" },
    { to: "/", label: "Browse Skills" },
  ];

  const navLinks = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col border-r border-white/10">
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-1">SkillSwap</h2>
        <p className="text-gray-400 text-sm">Hi, {user?.name || "User"}</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-4 py-2 rounded-lg transition ${
                  location.pathname === link.to
                    ? "bg-indigo-600 font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        onClick={handleLogoutClick}
        className="mt-8 w-full bg-red-600 hover:bg-red-700"
      >
        Logout
      </Button>
    </aside>
  );
}
