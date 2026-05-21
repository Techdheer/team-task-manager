import { useState } from "react";
import API from "../services/api";

function Tasks() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Created Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Task create failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>

      <input name="title" placeholder="Title" onChange={handleChange} className="border p-3 mb-3 block" />
      <input name="description" placeholder="Description" onChange={handleChange} className="border p-3 mb-3 block" />

      <select name="priority" onChange={handleChange} className="border p-3 mb-3 block">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={handleCreateTask} className="bg-black text-white px-5 py-3">
        Create Task
      </button>
    </div>
  );
}

export default Tasks;