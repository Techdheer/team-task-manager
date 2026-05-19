import { useEffect, useState } from "react";
import API from "../services/api";

function CreateTask() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
    project: "",
    dueDate: "",
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProjects(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

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
      alert(error.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Create Task
      </h1>

      <div className="bg-white p-6 rounded shadow w-500px">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="priority"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>

        <select
          name="project"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option value="">Select Project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        <select
          name="assignedTo"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option value="">Assign To User</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

export default CreateTask;