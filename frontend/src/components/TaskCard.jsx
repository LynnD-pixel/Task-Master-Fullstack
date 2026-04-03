function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div className="list-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button type="button" onClick={() => onDelete(task._id)}>
        Delete Task
      </button>
    </div>
  );
}

export default TaskCard;