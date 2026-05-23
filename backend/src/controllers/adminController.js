const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/Activitylogs");


// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE USER
const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE USER STATUS
const updateUserStatus = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = req.body.status;

    await user.save();

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
const getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE ANY TASK
const deleteAnyTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted by admin",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ACTIVITY LOGS
const getActivityLogs = async (req, res) => {

  try {

    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
};