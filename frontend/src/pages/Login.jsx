import { useState } from "react";
import API from "../services/api";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location.href = "/dashboard";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded shadow w-450px">

        <h1 className="text-5xl font-bold mb-8 text-center">
          Login
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-black text-white py-4 rounded"
        >
          Login
        </button>
<p className="text-center mt-5">
  Don't have an account?

  <span
    onClick={() => window.location.href = "/signup"}
    className="text-blue-600 cursor-pointer ml-2"
  >
    Signup
  </span>
</p>
      </div>

    </div>
  );
}

export default Login;