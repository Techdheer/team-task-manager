import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const token = localStorage.getItem("token");

 const fetchUsers = async () => {
  try {
    const res = await API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
    console.log("Users:", res.data);
  } catch (error) {
    console.log("Users fetch error:", error.response?.data || error.message);
  }
};

 

  const addMember = async () => {
    await API.post(
      `/projects/${id}/add-member`,
      { userId: selectedUser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Member Added");
    fetchProject();
  };

  const removeMember = async (userId) => {
    await API.post(
      `/projects/${id}/remove-member`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Member Removed");
    fetchProject();
  };

  useEffect(() => {
    fetchProject();
    fetchUsers();
  }, []);

  if (!project) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-4">
            {project.name}
          </h1>

          <p className="text-gray-600 mb-8">
            {project.description}
          </p>

          <div className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Add Member
            </h2>

            <select
              className="border p-3 rounded mr-4"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button
              onClick={addMember}
              className="bg-black text-white px-5 py-3 rounded"
            >
              Add Member
            </button>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">
              Members
            </h2>

            {project.members.map((member) => (
              <div
                key={member._id}
                className="border p-4 rounded mb-3 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-gray-500">{member.email}</p>
                </div>

                <button
                  onClick={() => removeMember(member._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;