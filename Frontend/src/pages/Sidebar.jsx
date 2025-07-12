import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Book,
  Calendar,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: Book },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <div
      className={`
        h-screen bg-white/80 backdrop-blur-xl shadow-lg border-r fixed top-0 left-0 z-50
        transition-all duration-300 ease-in-out flex flex-col
        ${collapsed ? "w-16" : "w-60"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b">
        {!collapsed && (
          <span className="text-xl font-bold text-indigo-700 tracking-tight">BVM</span>
        )}
        <button
          onClick={() => {
            if (window.innerWidth < 768) setMobileOpen(false);
            else setCollapsed(!collapsed);
          }}
          className="p-2 rounded-lg hover:bg-indigo-100 transition"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 p-3 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`
            }
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
            {collapsed && (
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm transition"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
}
