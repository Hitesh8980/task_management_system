const ActivityLog = require("../models/Activitylogs");

const logActivity = async (userId, action, details) => {

  try {

    await ActivityLog.create({
      user: userId,
      action,
      details,
    });

  } catch (error) {

    console.log("Activity log error:", error.message);
  }
};

module.exports = logActivity;