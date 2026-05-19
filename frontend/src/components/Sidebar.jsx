import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        Menu
      </h2>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/projects">Projects</Link>

        {user?.role === "admin" && (
          <Link to="/create-task">Create Task</Link>
        )}

        <Link to="/tasks">Tasks</Link>

        <Link to="/kanban">Kanban Board</Link>

        {user?.role === "admin" && (
          <Link to="/users">Users</Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;