const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");


// USERS
router.get("/users", protect, adminOnly, getAllUsers);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.patch(
  "/users/:id/status",
  protect,
  adminOnly,
  updateUserStatus
);


// TASKS
router.get("/tasks", protect, adminOnly, getAllTasks);

router.delete("/tasks/:id", protect, adminOnly, deleteAnyTask);


// LOGS
router.get("/logs", protect, adminOnly, getActivityLogs);

module.exports = router;