import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/ui/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ from token-based context
  const [swapRequests, setSwapRequests] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // ✅ Simulated incoming & outgoing requests
    const simulatedRequests = [
      {
        id: 1,
        from: "Anjali P.",
        to: user.name,
        skill: "UI/UX Design",
        status: "pending",
      },
      {
        id: 2,
        from: user.name,
        to: "Ravi D.",
        skill: "Marketing",
        status: "accepted",
      },
    ];

    setSwapRequests(simulatedRequests);
  }, [navigate, user]);

  const handleLogout = () => {
    navigate("/logout")        // ✅ this removes token & user
    navigate("/login");
  };

  const renderSkills = (skills) => {
    if (Array.isArray(skills) && skills.length > 0) {
      return skills.join(", ");
    }
    return "None";
  };

  if (!user) return null; // Prevent render if user not loaded yet

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar onLogout={handleLogout} user={user} />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto border border-white/20 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Location:</span> {user.location || "N/A"}</p>
              <p><span className="font-medium">Role:</span> {user.role}</p>
              <p><span className="font-medium">Public Profile:</span> {user.isProfilePublic ? "Yes" : "No"}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <p><span className="font-medium">Offered:</span> {renderSkills(user.skillsOffered)}</p>
              <p><span className="font-medium">Wanted:</span> {renderSkills(user.skillsWanted)}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Swap Requests</h2>
              {swapRequests.length === 0 ? (
                <p className="text-gray-400">No swap activity yet.</p>
              ) : (
                <ul className="space-y-3">
                  {swapRequests.map((req) => (
                    <li
                      key={req.id}
                      className="flex justify-between items-center bg-white/10 px-4 py-3 rounded-lg"
                    >
                      <span>
                        {req.from !== user.name ? (
                          <>
                            <b>{req.from}</b> wants to learn <b>{req.skill}</b>
                          </>
                        ) : (
                          <>
                            You requested <b>{req.skill}</b> from <b>{req.to}</b>
                          </>
                        )}
                      </span>
                      <span
                        className={`capitalize font-medium ${
                          req.status === "pending"
                            ? "text-yellow-400"
                            : req.status === "accepted"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {req.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
