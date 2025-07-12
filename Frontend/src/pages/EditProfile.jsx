import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/ui/Sidebar"; // Sidebar added

const SKILLS = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Mobile Apps",
  "DevOps",
  "AI/ML",
  "Marketing",
  "Writing",
  "Other",
];

const AVAILABILITY = [
  "Weekdays",
  "Weekends",
  "Mornings",
  "Afternoons",
  "Evenings",
  "Flexible",
];

export default function EditProfile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/login");

    setFormData({
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      isProfilePublic: true,
      ...storedUser,
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name.startsWith("skillsOffered-")) {
      const skill = name.replace("skillsOffered-", "");
      setFormData((prev) => ({
        ...prev,
        skillsOffered: checked
          ? [...prev.skillsOffered, skill]
          : prev.skillsOffered.filter((s) => s !== skill),
      }));
    } else if (type === "checkbox" && name.startsWith("skillsWanted-")) {
      const skill = name.replace("skillsWanted-", "");
      setFormData((prev) => ({
        ...prev,
        skillsWanted: checked
          ? [...prev.skillsWanted, skill]
          : prev.skillsWanted.filter((s) => s !== skill),
      }));
    } else if (type === "checkbox" && name.startsWith("availability-")) {
      const slot = name.replace("availability-", "");
      setFormData((prev) => ({
        ...prev,
        availability: checked
          ? [...prev.availability, slot]
          : prev.availability.filter((a) => a !== slot),
      }));
    } else if (type === "checkbox" && name === "isProfilePublic") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    updateUser(formData);
    alert("Profile updated successfully");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  if (!formData) return null;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar user={formData} onLogout={handleLogout} />

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto border border-white/20 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <Link
              to="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 h-10 rounded-lg"
            >
              👈 Back to Dashboard
            </Link>
          </div>

          <form className="space-y-4 text-black" onSubmit={handleSubmit}>
            <Input
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Photo URL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
            />
            <Input
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <div>
              <label className="block font-medium mb-1 text-white">Skills Offered</label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-white"
                  >
                    <input
                      type="checkbox"
                      name={`skillsOffered-${skill}`}
                      checked={formData.skillsOffered.includes(skill)}
                      onChange={handleChange}
                      className="accent-indigo-500"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-white">Skills Wanted</label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-white"
                  >
                    <input
                      type="checkbox"
                      name={`skillsWanted-${skill}`}
                      checked={formData.skillsWanted.includes(skill)}
                      onChange={handleChange}
                      className="accent-indigo-500"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-white">Availability</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY.map((slot) => (
                  <label
                    key={slot}
                    className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-white"
                  >
                    <input
                      type="checkbox"
                      name={`availability-${slot}`}
                      checked={formData.availability.includes(slot)}
                      onChange={handleChange}
                      className="accent-indigo-500"
                    />
                    <span className="text-sm">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                name="isProfilePublic"
                checked={formData.isProfilePublic}
                onChange={handleChange}
                className="accent-indigo-500"
              />
              Make profile public
            </label>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
