const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assignedTo,
      project,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      project,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    let tasks;

   tasks = await Task.find({
  createdBy: req.user.id,
})
  .populate("assignedTo", "name email")
  .populate("createdBy", "name")
  .populate("project", "name");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE TASK
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task updated",
      updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can update only your assigned task",
      });
    }

    task.status = status;
    await task.save();

    res.json({
      message: "Task status updated",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};