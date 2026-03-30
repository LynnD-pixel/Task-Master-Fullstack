import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    //wait until auth is loaded
    if (loading) return <p>Loading...</p>;

    //If not logged in redirect
    if (!user) {
        return <Navigate to="/login"/>;
    }

    //if logged in then show page
    return children;
};

export default PrivateRoute;