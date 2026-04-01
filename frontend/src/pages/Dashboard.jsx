import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        console.log("User:", user);
            //later: fetch projects from API
    }, [user]);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user?.username || "User"}</p>

            <div>
                <h2>Your Projects</h2>
                {projects.length === 0 ? (
                    <p>No projects yet</p>
                ) : (
                    projects.map((p) => <div key={p.id}>{p.name}</div>)
                )}
            </div>
        </div>
    );
};

export default Dashboard;