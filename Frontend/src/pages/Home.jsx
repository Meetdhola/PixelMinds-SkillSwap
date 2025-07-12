import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/user/public")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6 bg-indigo-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Browse Public Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-bold text-indigo-700">{user.name}</h2>
            <p className="text-gray-500">{user.location}</p>
            <div className="mt-2">
              <p className="text-sm font-semibold">Offers:</p>
              <div className="flex flex-wrap gap-1">
                {user.skillsOffered.map((s, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">{s}</span>
                ))}
              </div>
            </div>
            <Link to={`/request/${user._id}`} className="mt-3 inline-block text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">
              Request Swap
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
