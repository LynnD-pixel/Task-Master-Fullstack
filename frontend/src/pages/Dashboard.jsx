import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { projectClient } from "../clients/api";

const Dashboard = () => {
  const { user } = useAuth();
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
        setError("Failed to load projects");
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

    try {
      const { data } = await projectClient.post("/", {
        name,
        description,
      });
        //add new project to UI instantly
      setProjects((prev) => [data, ...prev]);

      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.username}</p>

      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleCreateProject}>
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
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Create</button>
      </form>

      <div>
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map((project) => (
            <div key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;