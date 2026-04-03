import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { token } from "../clients/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectRes = await axios.get(`${BASE_URL}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        });

        const tasksRes = await axios.get(`${BASE_URL}/api/projects/${id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        });

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/projects/${id}/tasks`,
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      setTasks((prev) => [data, ...prev]);
      setTitle("");
      setDescription("");
      setStatus("To Do");
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data : task))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <form onSubmit={handleCreateTask}>
        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div>
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>

              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <button type="button" onClick={() => handleDeleteTask(task._id)}>
                Delete Task
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Project;