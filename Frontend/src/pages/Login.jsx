import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Login</h2>
        <input className="w-full mb-3 p-3 border rounded" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full mb-3 p-3 border rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700">Login</button>
      </div>
    </div>
  );
}
