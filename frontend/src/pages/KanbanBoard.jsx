import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



function KanbanBoard() {

  const [tasks, setTasks] = useState([]);




  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {
    fetchTasks();
  }, []);




  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );



  const progressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );



  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );




  const TaskBox = ({ task }) => (

    <div className="bg-white p-4 rounded shadow mb-4">

      <h3 className="font-bold text-xl">
        {task.title}
      </h3>

      <p className="text-gray-500 mt-2">
        {task.description}
      </p>

    </div>

  );




  return (
    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />



        <div className="flex-1 p-10 bg-gray-100 min-h-screen">

          <h1 className="text-5xl font-bold mb-8">
            Kanban Board 
          </h1>



          <div className="grid grid-cols-3 gap-6">

            <div className="bg-gray-200 p-5 rounded-lg">

              <h2 className="text-2xl font-bold mb-6">
                Todo
              </h2>

              {todoTasks.map((task) => (
                <TaskBox
                  key={task._id}
                  task={task}
                />
              ))}

            </div>




            <div className="bg-yellow-100 p-5 rounded-lg">

              <h2 className="text-2xl font-bold mb-6">
                In Progress
              </h2>

              {progressTasks.map((task) => (
                <TaskBox
                  key={task._id}
                  task={task}
                />
              ))}

            </div>




            <div className="bg-green-100 p-5 rounded-lg">

              <h2 className="text-2xl font-bold mb-6">
                Done
              </h2>

              {doneTasks.map((task) => (
                <TaskBox
                  key={task._id}
                  task={task}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default KanbanBoard;