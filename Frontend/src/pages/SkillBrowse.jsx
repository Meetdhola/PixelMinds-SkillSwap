import React, { useState, useEffect } from "react";
import { users } from "../data/users"; // Dummy data
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import RequestModal from "../components/RequestModal";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/ui/Sidebar";

const USERS_PER_PAGE = 4;

export default function SkillBrowse() {
  const { isAuthenticated, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
  };

  const filteredUsers = users.filter((user) => {
    if (!user.isPublic) return false;
    if (availabilityFilter && !user.availability.includes(availabilityFilter))
      return false;
    if (
      search &&
      !user.skillsOffered.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      ) &&
      !user.skillsWanted.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="flex-1 px-6 py-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
          <div className="flex items-center gap-4">
            <select
              className="p-2 rounded bg-gray-800 text-white"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">Availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Mornings">Mornings</option>
              <option value="Afternoons">Afternoons</option>
              <option value="Evenings">Evenings</option>
              <option value="Flexible">Flexible</option>
            </select>
            <Input
              placeholder="Search by skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
        </header>

        {/* User Cards */}
        <div className="space-y-6">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-900 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-green-400 text-sm">
                    Skills Offered:{" "}
                    {user.skillsOffered.map((s) => (
                      <span
                        key={s}
                        className="bg-gray-700 text-white px-2 py-1 rounded mx-1 text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </p>
                  <p className="text-blue-400 text-sm">
                    Skills Wanted:{" "}
                    {user.skillsWanted.map((s) => (
                      <span
                        key={s}
                        className="bg-gray-700 text-white px-2 py-1 rounded mx-1 text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-300 mb-2">
                  Rating: {user.rating}/5
                </span>

                {isAuthenticated && (
                  <Button
                    onClick={() => setShowModal(user)}
                    className="bg-teal-700 hover:bg-teal-600 text-white"
                  >
                    Request
                  </Button>
                )}
                {showModal === user && (
                  <RequestModal
                    targetUser={user}
                    onClose={() => setShowModal(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
