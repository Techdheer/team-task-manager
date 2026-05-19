import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-8">
            Manage Users
          </h1>

          <div className="grid grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-6 rounded shadow"
              >
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {user.email}
                </p>

                <p className="mt-3 bg-black text-white inline-block px-3 py-1 rounded">
                  {user.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;