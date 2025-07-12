import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { users as fakeUsers } from "../data/users";
import Sidebar from "../components/ui/Sidebar";

export default function AdminDashboard() {
  const { user, logout } = useAuth(); // includes logout for sidebar
  const [allUsers, setAllUsers] = useState([]);

  // Only allow admin
  if (!user || user.role !== "admin") return <Navigate to="/" />;

  useEffect(() => {
    // Replace with API call if needed
    setAllUsers(fakeUsers);
  }, []);

  const togglePublic = (id) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isPublic: !u.isPublic } : u))
    );
  };

  const banUser = (id) => {
    if (!window.confirm("Ban this user?")) return;
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar onLogout={logout} user={user} />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Public?</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id} className="border-b border-gray-800">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.isPublic ? "Yes" : "No"}</td>
                  <td className="p-2 flex gap-2">
                    <Button
                      onClick={() => togglePublic(u.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1"
                    >
                      Toggle Public
                    </Button>
                    <Button
                      onClick={() => banUser(u.id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1"
                    >
                      Ban
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
