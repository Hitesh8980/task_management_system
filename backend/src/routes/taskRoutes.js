const express = require("express");

const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", protect, createTask);


// GET MY TASKS
router.get("/", protect, getMyTasks);


// UPDATE TASK
router.put("/:id", protect, updateTask);


// DELETE TASK
router.delete("/:id", protect, deleteTask);

module.exports = router;