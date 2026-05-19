import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-7xl font-bold mb-4">404</h1>

      <p className="text-2xl mb-6">
        Page Not Found
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFound;