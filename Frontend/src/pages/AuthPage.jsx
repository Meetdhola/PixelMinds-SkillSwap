import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useAuth } from "../context/AuthContext";

const SKILLS = [
  "Web Development", "UI/UX Design", "Data Science", "Mobile Apps",
  "DevOps", "AI/ML", "Marketing", "Writing", "Other"
];

const AVAILABILITY = [
  "Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings", "Flexible"
];

export default function AuthPage({ tab }) {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "signup");

  useEffect(() => {
    const current = location.pathname.replace("/", "");
    if (current === "login" || current === "signup") {
      setActiveTab(current);
    }
  }, [location.pathname]);

  const [signupData, setSignupData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    photoURL: "", location: "",
    skillsOffered: [], skillsWanted: [],
    availability: [], isProfilePublic: true,
    role: "user",
  });

  const [loginData, setLoginData] = useState({
    email: "", password: "", remember: false,
  });

  const handleTabChange = (val) => {
    setActiveTab(val);
    navigate(`/${val}`);
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "isProfilePublic") {
        return setSignupData((prev) => ({ ...prev, isProfilePublic: checked }));
      }
      const [field, actualValue] = name.split("-");
      return setSignupData((prev) => ({
        ...prev,
        [field]: checked
          ? [...prev[field], actualValue]
          : prev[field].filter((item) => item !== actualValue),
      }));
    }

    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await axios.post("http://localhost:5050/api/auth/signup", signupData);
      const { token, user } = res.data;

      login(user, token);
      alert("Signup successful!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", loginData);
      const { token, user } = res.data;

      login(user, token);
      alert("Login successful!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
  //     <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
  //       <TabsList>
  //         <TabsTrigger value="login">Login</TabsTrigger>
  //         <TabsTrigger value="signup">Sign Up</TabsTrigger>
  //       </TabsList>

  //       {/* ---------- Login Tab ---------- */}
  //       <TabsContent value="login">
  //         <Card>
  //           <CardContent>
  //             <h2 className="text-2xl font-bold text-center">Welcome Back! 👋</h2>
  //             <form className="space-y-4 mt-6" onSubmit={handleLoginSubmit}>
  //               <Input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
  //               <Input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
  //               <div className="flex justify-between items-center text-sm">
  //                 <label className="flex items-center gap-2">
  //                   <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange} className="accent-indigo-600" />
  //                   Remember me
  //                 </label>
  //                 <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
  //               </div>
  //               <Button type="submit">Login</Button>
  //             </form>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>

  //       {/* ---------- Signup Tab ---------- */}
  //       <TabsContent value="signup">
  //         <Card>
  //           <CardContent>
  //             <h2 className="text-2xl font-bold text-center">Create Account ✨</h2>
  //             <form className="space-y-4 mt-6" onSubmit={handleSignupSubmit}>
  //               <Input name="name" placeholder="Full Name" value={signupData.name} onChange={handleSignupChange} required />
  //               <Input name="email" type="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                 <Input name="password" type="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
  //                 <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupChange} required />
  //               </div>
  //               <Input name="photoURL" type="url" placeholder="Photo URL (optional)" value={signupData.photoURL} onChange={handleSignupChange} />
  //               <Input name="location" placeholder="Location (City, Country)" value={signupData.location} onChange={handleSignupChange} />

  //               {/* Skills Offered */}
  //               <div>
  //                 <label className="block font-medium mb-1">Skills Offered</label>
  //                 <div className="flex flex-wrap gap-2">
  //                   {SKILLS.map((skill) => (
  //                     <label key={skill} className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded">
  //                       <input type="checkbox" name={`skillsOffered-${skill}`} checked={signupData.skillsOffered.includes(skill)} onChange={handleSignupChange} className="accent-indigo-600" />
  //                       <span className="text-sm">{skill}</span>
  //                     </label>
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* Skills Wanted */}
  //               <div>
  //                 <label className="block font-medium mb-1">Skills Wanted</label>
  //                 <div className="flex flex-wrap gap-2">
  //                   {SKILLS.map((skill) => (
  //                     <label key={skill} className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded">
  //                       <input type="checkbox" name={`skillsWanted-${skill}`} checked={signupData.skillsWanted.includes(skill)} onChange={handleSignupChange} className="accent-indigo-600" />
  //                       <span className="text-sm">{skill}</span>
  //                     </label>
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* Availability */}
  //               <div>
  //                 <label className="block font-medium mb-1">Availability</label>
  //                 <div className="flex flex-wrap gap-2">
  //                   {AVAILABILITY.map((slot) => (
  //                     <label key={slot} className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded">
  //                       <input type="checkbox" name={`availability-${slot}`} checked={signupData.availability.includes(slot)} onChange={handleSignupChange} className="accent-indigo-600" />
  //                       <span className="text-sm">{slot}</span>
  //                     </label>
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* Profile Public */}
  //               <div className="flex items-center gap-2">
  //                 <input type="checkbox" name="isProfilePublic" checked={signupData.isProfilePublic} onChange={handleSignupChange} className="accent-indigo-600" />
  //                 <span className="text-sm">Make my profile public</span>
  //               </div>

  //               {/* Role */}
  //               <div>
  //                 <label className="block font-medium mb-1">Role</label>
  //                 <select name="role" value={signupData.role} onChange={handleSignupChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
  //                   <option value="user">User</option>
  //                   <option value="admin">Admin</option>
  //                 </select>
  //               </div>

  //               <Button type="submit">Sign Up</Button>
  //             </form>
  //             <p className="text-center text-sm mt-4">
  //               Already have an account?{" "}
  //               <span onClick={() => handleTabChange("login")} className="text-indigo-600 font-medium cursor-pointer hover:underline">
  //                 Login
  //               </span>
  //             </p>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // );
   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 text-black">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-3xl">
        <TabsList className="flex justify-center gap-4 bg-gray-200 rounded-lg p-2">
          <TabsTrigger
            value="login"
            className={`px-6 py-2 rounded-md font-medium ${activeTab === "login" ? "bg-indigo-600 text-black" : "text-gray-300 hover:bg-gray-700"}`}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className={`px-6 py-2 rounded-md font-medium ${activeTab === "signup" ? "bg-indigo-600 text-black" : "text-gray-300 hover:bg-gray-700"}`}
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* ---------- Login Tab ---------- */}
        <TabsContent value="login">
          <Card className="bg-gray-900 border border-black mt-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-center mb-4">Welcome Back 👋</h2>
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <Input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                <Input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                <div className="flex justify-between text-sm items-center">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange} className="accent-indigo-600" />
                    Remember me
                  </label>
                  <a href="#" className="text-indigo-400 hover:underline">Forgot Password?</a>
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Login</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------- Signup Tab ---------- */}
        <TabsContent value="signup">
          <Card className="bg-gray-900 border border-white/10 mt-6">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-center mb-2">Create Account ✨</h2>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <Input name="name" placeholder="Full Name" value={signupData.name} onChange={handleSignupChange} required />
                <Input name="email" type="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="password" type="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
                  <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupChange} required />
                </div>
                <Input name="photoURL" placeholder="Photo URL (optional)" value={signupData.photoURL} onChange={handleSignupChange} />
                <Input name="location" placeholder="Location (City, Country)" value={signupData.location} onChange={handleSignupChange} />

                <div>
                  <label className="block font-semibold mb-1">Skills Offered</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <label key={skill} className="bg-white/10 px-3 py-1 rounded flex items-center gap-2">
                        <input type="checkbox" name={`skillsOffered-${skill}`} checked={signupData.skillsOffered.includes(skill)} onChange={handleSignupChange} className="accent-indigo-500" />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Skills Wanted</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <label key={skill} className="bg-white/10 px-3 py-1 rounded flex items-center gap-2">
                        <input type="checkbox" name={`skillsWanted-${skill}`} checked={signupData.skillsWanted.includes(skill)} onChange={handleSignupChange} className="accent-indigo-500" />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABILITY.map((slot) => (
                      <label key={slot} className="bg-white/10 px-3 py-1 rounded flex items-center gap-2">
                        <input type="checkbox" name={`availability-${slot}`} checked={signupData.availability.includes(slot)} onChange={handleSignupChange} className="accent-indigo-500" />
                        <span className="text-sm">{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isProfilePublic" checked={signupData.isProfilePublic} onChange={handleSignupChange} className="accent-indigo-500" />
                  <span className="text-sm">Make my profile public</span>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Role</label>
                  <select name="role" value={signupData.role} onChange={handleSignupChange} className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-white/10">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
              </form>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <span onClick={() => handleTabChange("login")} className="text-indigo-400 font-medium cursor-pointer hover:underline">Login</span>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

}
