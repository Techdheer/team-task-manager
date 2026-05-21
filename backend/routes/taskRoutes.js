const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  createTask
);


// GET ALL TASKS
router.get("/", authMiddleware, getTasks);


// GET SINGLE TASK
router.get("/:id", authMiddleware, getTaskById);


// UPDATE TASK
router.put("/:id", authMiddleware, updateTask);


// DELETE TASK
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTask
);

// UPDATE STATUS
router.patch("/:id/status", authMiddleware, updateTaskStatus);

module.exports = router;