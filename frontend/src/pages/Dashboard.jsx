import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const downloadReport = () => {
  const doc = new jsPDF();

  doc.text("Task Manager Report", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [["Title", "Priority", "Status", "Assigned To"]],
    body: tasks.map((task) => [
      task.title,
      task.priority,
      task.status,
      task.assignedTo?.name || "Not Assigned",
    ]),
  });

  doc.save("task-report.pdf");
};
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.status === "done");
  const pendingTasks = tasks.filter((task) => task.status !== "done");
  const overdueTasks = tasks.filter((task) => {

  return (
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done"
  );

});

  const pieData = [
    { name: "Done", value: completedTasks.length },
    { name: "Pending", value: pendingTasks.length },
  ];
const tasksPerUser = {};

tasks.forEach((task) => {

  const userName =
    task.assignedTo?.name || "Unassigned";

  tasksPerUser[userName] =
    (tasksPerUser[userName] || 0) + 1;

});

const userTaskData = Object.keys(tasksPerUser).map(
  (user) => ({
    name: user,
    tasks: tasksPerUser[user],
  })
);
  const barData = [
    {
      name: "Low",
      tasks: tasks.filter((task) => task.priority === "low").length,
    },
    {
      name: "Medium",
      tasks: tasks.filter((task) => task.priority === "medium").length,
    },
    {
      name: "High",
      tasks: tasks.filter((task) => task.priority === "high").length,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
         <div className="flex justify-between items-center mb-8">
  <h1 className="text-5xl font-bold">
    Dashboard
  </h1>

  <button
    onClick={downloadReport}
    className="bg-black text-white px-5 py-3 rounded"
  >
    Download PDF Report
  </button>
</div>

         <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-8 rounded shadow">
  <h2 className="text-2xl font-bold">
    Overdue Tasks
  </h2>

  <p className="text-4xl mt-4 text-red-500">
    {overdueTasks.length}
  </p>
</div>
            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-2xl font-bold">Total Tasks</h2>
              <p className="text-4xl mt-4">{tasks.length}</p>
            </div>

            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-2xl font-bold">Completed Tasks</h2>
              <p className="text-4xl mt-4">{completedTasks.length}</p>
            </div>

            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-2xl font-bold">Pending Tasks</h2>
              <p className="text-4xl mt-4">{pendingTasks.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">
                Task Status Distribution
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded shadow">
  <h2 className="text-2xl font-bold mb-4">
    Tasks Per User
  </h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={userTaskData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="tasks" />
    </BarChart>
  </ResponsiveContainer>
</div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">
                Task Priority Levels
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow mt-8">
            <h2 className="text-3xl font-bold mb-6">
              Recent Tasks
            </h2>

            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-bold">
                      {task.title}
                    </h3>

                    <p className="text-gray-500">
                      {task.description}
                    </p>
                  </div>

                  <span className="bg-black text-white px-4 py-2 rounded">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;