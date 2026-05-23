const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");

// CREATE TASK
const createTask = async (req, res) => {

  try {

    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user._id,
    });
    await logActivity(
  req.user._id,
  "TASK_CREATED",
  `Created task: ${task.title}`
);

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MY TASKS
const getMyTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);
    await logActivity(
  req.user._id,
  "TASK_UPDATED",
  `Updated task: ${updatedTask.title}`
);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ownership check
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);
    await logActivity(
  req.user._id,
  "TASK_DELETED",
  `Deleted task: ${task.title}`
);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ownership check
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
};