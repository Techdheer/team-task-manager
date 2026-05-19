const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getUserById
);

module.exports = router;