import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/projects", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project Created Successfully");

      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Project creation failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">
            Projects
          </h1>

          <div className="bg-white p-6 rounded shadow w-500px mb-8">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="w-full border p-3 rounded mb-4"
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              className="w-full border p-3 rounded mb-4"
              onChange={handleChange}
            />

            <button
              onClick={createProject}
              className="bg-black text-white px-6 py-3 rounded"
            >
              Create Project
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded shadow"
              >
                <h2 className="text-2xl font-bold">
                  {project.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {project.description}
                </p>

                <p className="mt-4 text-sm">
                  Admin: {project.admin?.name}
                </p>

                <p className="mt-2 text-sm">
                  Members: {project.members?.length}
                </p>
                <button
  onClick={() => navigate(`/projects/${project._id}`)}
  className="mt-4 bg-black text-white px-4 py-2 rounded"
>
  View Details
</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;