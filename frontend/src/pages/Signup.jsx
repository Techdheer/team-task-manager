import { useState } from "react";
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", formData);

      alert("Signup Successful");

      window.location.href = "/";
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow w-450px]">
        <h1 className="text-5xl font-bold mb-8 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-4 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-4 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-4 rounded mb-4"
          onChange={handleChange}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-4 rounded"
        >
          Signup
        </button>

        <p className="text-center mt-5">
          Already have an account?

          <span
            onClick={() => window.location.href = "/"}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;