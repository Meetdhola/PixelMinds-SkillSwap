// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // const logout = () => {
  //   setUser(null);
  //   setToken(null);
  //   localStorage.removeItem("token");
  // };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5050/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data;

        if (userData?.role === "admin") {
          setUser(false);
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error("❌ AuthContext: Invalid or expired token", error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = (userData, authToken) => {
    if (!userData || !authToken) {
      console.error("❌ AuthContext: Invalid login payload");
      logout();
      return;
    }

    setToken(authToken);
    localStorage.setItem("token", authToken);

    if (userData.role === "admin") {
      setUser(false);
    } else {
      setUser(userData);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && user !== false,
        login,
        // logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
