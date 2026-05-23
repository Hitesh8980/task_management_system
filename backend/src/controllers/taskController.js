const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");

// CREATE TASK (Only for logged-in users)
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
    });

    await logActivity(req.user._id, "TASK_CREATED", `Created task: ${task.title}`);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS - Smart Logic (Admin sees all, User sees only own)
const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      // Admin can see ALL tasks
      tasks = await Task.find()
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 });
    } else {
      // Normal user sees only their own tasks
      tasks = await Task.find({ createdBy: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK (Admin can update any, User can update only own)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Permission Check
    if (req.user.role !== "Admin" && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("createdBy", "name email");

    await logActivity(req.user._id, "TASK_UPDATED", `Updated task: ${updatedTask.title}`);

    res.json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE TASK (Admin can delete any, User can delete only own)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Permission Check
    if (req.user.role !== "Admin" && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    await logActivity(req.user._id, "TASK_DELETED", `Deleted task: ${task.title}`);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,       
  updateTask,
  deleteTask,
};