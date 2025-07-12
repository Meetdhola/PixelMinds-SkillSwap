// src/pages/Requests.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Sidebar from "../components/ui/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Requests() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();                 // ⬅️ token‑based user
  const [requests, setRequests] = useState([]);

  /* ──────────────────────────────────────────────
     Load requests for this user (dummy localStorage)
  ────────────────────────────────────────────── */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const allRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const userRequests = allRequests.filter(
      (r) => r.from === user.name || r.to === user.name
    );
    setRequests(userRequests);
  }, [user, navigate]);

  /* ──────────────────────────────────────────────
     Update status (accept / reject)
  ────────────────────────────────────────────── */
  const updateStatus = (id, newStatus) => {
    const allRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const updated = allRequests.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    localStorage.setItem("requests", JSON.stringify(updated));

    setRequests(updated.filter(
      (r) => r.from === user.name || r.to === user.name
    ));
  };

  const handleLogout = () => {
    logout();                         // removes token
    navigate("/login");
  };

  /* ────────────────────────────────────────────── */
  const RequestItem = ({ req }) => {
    const isIncoming = req.to === user.name;
    return (
      <li className="flex justify-between items-center bg-white/10 px-4 py-3 rounded-lg">
        <span>
          {isIncoming ? (
            <>
              <b>{req.from}</b> requested <b>{req.skill}</b> from you
            </>
          ) : (
            <>
              You requested <b>{req.skill}</b> from <b>{req.to}</b>
            </>
          )}
          <div className="text-sm text-gray-400">Status: {req.status}</div>
        </span>

        {isIncoming && req.status === "pending" ? (
          <div className="flex gap-2">
            <Button
              className="bg-green-600 w-[100px] hover:bg-green-700"
              onClick={() => updateStatus(req.id, "accepted")}
            >
              Accept
            </Button>
            <Button
              className="bg-red-600 w-[100px] hover:bg-red-700"
              onClick={() => updateStatus(req.id, "rejected")}
            >
              Reject
            </Button>
          </div>
        ) : (
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
        )}
      </li>
    );
  };

  if (!user) return null;          // guard until user is ready

  const outgoing = requests.filter((r) => r.from === user.name);
  const incoming = requests.filter((r) => r.to === user.name);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar onLogout={handleLogout} user={user} />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-1">My Requests</h1>
          <p className="text-gray-400 mb-8">View and manage your skill‑swap requests</p>

          {/* OUTGOING */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Outgoing Requests</h2>
            {outgoing.length ? (
              <ul className="space-y-3">
                {outgoing.map((req) => (
                  <RequestItem key={req.id} req={req} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No outgoing requests yet.</p>
            )}
          </section>

          {/* INCOMING */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
            {incoming.length ? (
              <ul className="space-y-3">
                {incoming.map((req) => (
                  <RequestItem key={req.id} req={req} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No incoming requests yet.</p>
            )}
          </section>

          <div className="mt-6">
            <Link
              to="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
