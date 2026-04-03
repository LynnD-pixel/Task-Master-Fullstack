import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { projectClient } from "../clients/api";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  const { user, logout } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectClient.get("/");
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await projectClient.post("/", {
        name,
        description,
      });

      setProjects((prev) => [data, ...prev]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        <h1>Dashboard</h1>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <p>Welcome, {user?.username}</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleCreateProject} className="card form-card">
        <h2>Create Project</h2>

        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Create Project</button>
      </form>

      <div className="card">
        <h2>Your Projects</h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          <div className="list">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;