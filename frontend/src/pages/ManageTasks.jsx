import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Deleted");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">
            Manage Tasks
          </h1>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search task..."
              className="border p-3 rounded w-80"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-3 rounded"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTasks;