import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient, projectClient } from "../clients/api.js";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectRes = await projectClient.get(`/${id}`);
        const tasksRes = await apiClient.get(`/projects/${id}/tasks`);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleCreateTask = async (taskData) => {
    try {
      const { data } = await apiClient.post(`/projects/${id}/tasks`, taskData);
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await apiClient.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data : task))
      );
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) return <p className="page">Loading project...</p>;
  if (error) return <p className="page error">{error}</p>;
  if (!project) return <p className="page">Project not found</p>;

  return (
    <div className="page">
      <p>
        <Link to="/">← Back to Dashboard</Link>
      </p>

      <div className="card">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <TaskForm onCreateTask={handleCreateTask} />

      <div className="card">
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <div className="list">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;