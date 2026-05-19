import { useNavigate } from "react-router-dom";

function TaskCard({ task, onDelete, onStatusChange }) {
  const navigate = useNavigate();

  const getPriorityColor = () => {
    if (task.priority === "high") return "bg-red-500";
    if (task.priority === "medium") return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusColor = () => {
    if (task.status === "done") return "bg-green-500";
    if (task.status === "in-progress") return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{task.title}</h2>

        <span className={`${getPriorityColor()} text-white px-3 py-1 rounded-full text-sm`}>
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-sm text-gray-500 mb-4">
  Assigned To: {task.assignedTo?.name || "Not Assigned"}
</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        className={`w-full p-3 rounded text-white mb-4 ${getStatusColor()}`}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(`/update-task/${task._id}`)}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;