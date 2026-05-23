const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", protect, createTask);


// GET MY TASKS
router.get("/", protect, getTasks);


// UPDATE TASK
router.put("/:id", protect, updateTask);


// DELETE TASK
router.delete("/:id", protect, deleteTask);

module.exports = router;