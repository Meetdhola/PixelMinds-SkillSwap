import { useParams, useNavigate } from "react-router-dom";
import { users } from "../data/users";             // fake DB
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import RequestModal from "../components/RequestModal";
import { useState } from "react";

export default function PublicProfile() {
  const { userId }   = useParams();
  const navigate     = useNavigate();
  const { isAuthenticated } = useAuth();

  const [showModal, setShowModal] = useState(false);

  // In real app fetch from API
  const user = users.find(u => u.id === Number(userId) && u.isPublic);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <p>User not found or profile is private.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <img src={user.photo} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white mb-4" />
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-400 mb-4">{user.location}</p>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="font-semibold mb-1">Skills Offered</h2>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map(s => (
            <span key={s} className="bg-gray-700 px-2 py-1 rounded text-sm">{s}</span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h2 className="font-semibold mb-1">Availability</h2>
        <div className="flex flex-wrap gap-2">
          {user.availability.map(a => (
            <span key={a} className="bg-gray-700 px-2 py-1 rounded text-sm">{a}</span>
          ))}
        </div>
      </div>

      {isAuthenticated ? (
        <Button onClick={() => setShowModal(true)}>Request Skill Swap</Button>
      ) : (
        <Button onClick={() => navigate('/login')}>Login to Request</Button>
      )}

      {showModal && (
        <RequestModal
          targetUser={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
