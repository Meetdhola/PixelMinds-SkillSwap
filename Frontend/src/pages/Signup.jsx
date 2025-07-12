import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const allSkills = ["Photoshop", "Figma", "React", "Excel", "Node.js", "Public Speaking", "UI/UX", "Video Editing"];

export default function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", location: "",
    skillsOffered: [], skillsWanted: []
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5050/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {

      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }


  };

  const toggleSkill = (type, skill) => {
    const updated = [...form[type]];
    const index = updated.indexOf(skill);
    if (index >= 0) updated.splice(index, 1);
    else updated.push(skill);
    setForm({ ...form, [type]: updated });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Signup</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="p-3 border rounded" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="p-3 border rounded" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="p-3 border rounded" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <input className="p-3 border rounded" placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        </div>

        <div className="mt-4">
          <label className="font-medium">Skills Offered:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allSkills.map(skill => (
              <button key={skill}
                className={`px-3 py-1 rounded-full text-sm border ${form.skillsOffered.includes(skill)
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600"
                  }`}
                onClick={() => toggleSkill("skillsOffered", skill)}>
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="font-medium">Skills Wanted:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allSkills.map(skill => (
              <button key={skill}
                className={`px-3 py-1 rounded-full text-sm border ${form.skillsWanted.includes(skill)
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600"
                  }`}
                onClick={() => toggleSkill("skillsWanted", skill)}>
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">
          Create Account
        </button>
      </div>
    </div>
  );
}
