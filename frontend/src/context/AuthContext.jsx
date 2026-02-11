import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      toast.success("Login successful!");
      if (user.role === "admin") {
        navigate("/admin/courses");
      } else {
        navigate("/dashboard");
      }
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      toast.success("Registration successful!");
      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
