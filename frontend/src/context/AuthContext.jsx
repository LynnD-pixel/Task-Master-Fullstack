import { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";

//Create context
const AuthContext = createContext();

//Custom hook 
export const useAuth = () => {
    return useContext(AuthContext);
};

//Provider component
export const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null); //logged in user
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
        const { data } = await axios.post(
            "http://localhost:3000/api/users/register",
            formData
        );

        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
    };
    //Login
    const login = async (formData) => {
        const { data } = await axios.post(
            "http://localhost:3000/api/users/login",
            formData
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
    };
    //Logout
    const logout =() => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };
    return (
        <AuthContext.Provider
        value={{ 
            user, 
            register, 
            login, 
            logout, 
            loading }}>
            {Children}
        </AuthContext.Provider>
    );
};