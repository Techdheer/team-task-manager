import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  const fetchTask = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFormData({
      title: res.data.title,
      description: res.data.description,
      priority: res.data.priority,
      status: res.data.status,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await API.put(`/tasks/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Task Updated");
    navigate("/tasks");
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-6">
            Update Task
          </h1>

          <div className="bg-white p-6 rounded shadow w-500px">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <button
              onClick={handleUpdate}
              className="bg-black text-white px-6 py-3 rounded"
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;