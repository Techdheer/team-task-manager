import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTasks(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    await API.post("/tasks", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Task Created Successfully");
    fetchTasks();
  };

  // ✅ ADD THIS FUNCTION
  const updateStatus = async (id, status) => {
    await API.patch(
      `/tasks/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="border p-3 mb-3 block"
      />

      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="border p-3 mb-3 block"
      />

      <select
        name="priority"
        onChange={handleChange}
        className="border p-3 mb-3 block"
      >
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={handleCreateTask}
        className="bg-black text-white px-5 py-3 mb-8"
      >
        Create Task
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Task List
      </h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 rounded mb-3"
        >
          <h3 className="font-bold">{task.title}</h3>

          <p>{task.description}</p>

          <p>Priority: {task.priority}</p>

          <select
            value={task.status}
            onChange={(e) =>
              updateStatus(task._id, e.target.value)
            }
            className="border p-2 mt-2"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="done">Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Tasks;