import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(formData);
            navigate("/"); //redirect to the dashboard after the user registers
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required />

                <input 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required />

                <input 
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            <p>
                Already have an account? <Link to={"/login"}>Login</Link>
            </p>
        </div>
    );
};

export default Register;