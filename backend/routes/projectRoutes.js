const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getMyProjects,
  getProjectById,
  addMember,
  removeMember,
} = require("../controllers/projectController");


router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getMyProjects);

router.get("/:id", authMiddleware, getProjectById);

router.post("/:id/add-member", authMiddleware, addMember);

router.post("/:id/remove-member", authMiddleware, removeMember);

module.exports = router;