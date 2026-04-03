import { useState } from "react";

function TaskForm({ onCreateTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(formData);

    setFormData({
      title: "",
      description: "",
      status: "To Do",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card form-card">
      <h2>Create Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;