import { createContext, useContext, useState, useEffect } from "react";
import { userClient } from "../clients/api";

//Create context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Load user from localstorage on app starting
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  //Register
  const register = async (formData) => {
    const { data } = await userClient.post("/register", formData);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };
  //login
  const login = async (formData) => {
    const { data } = await userClient.post("/login", formData);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };
  //logout
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};