import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ManageTasks from "../pages/ManageTasks";
import Users from "../pages/Users";
import UpdateTask from "../pages/UpdateTask";
import KanbanBoard from "../pages/KanbanBoard";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";
import CreateTask from "../pages/CreateTask";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import ProjectDetails from "../pages/ProjectDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <ManageTasks />
            </ProtectedRoute>
          }
        />

       <Route
  path="/create-task"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <CreateTask />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

       <Route
  path="/users"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <Users />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

        <Route
          path="/update-task/:id"
          element={
            <ProtectedRoute>
              <UpdateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
  path="/projects/:id"
  element={
    <ProtectedRoute>
      <ProjectDetails />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;