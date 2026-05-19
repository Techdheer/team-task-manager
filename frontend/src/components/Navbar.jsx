function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";
  };



  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold">
        Task Manager
      </h1>



      <div className="flex items-center gap-4">

        <div className="text-right">

          <h2 className="font-bold">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-300">
            {user?.email}
          </p>

        </div>



        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">

          {user?.name?.charAt(0)}

        </div>



        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;