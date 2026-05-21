
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();

// middleware
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/projects", projectRoutes);


// ✅ ROUTES ADD KARO
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch((err) => console.log(err));