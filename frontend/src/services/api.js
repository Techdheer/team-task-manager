import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-backend-on8u.onrender.com/api",
});

export default API;