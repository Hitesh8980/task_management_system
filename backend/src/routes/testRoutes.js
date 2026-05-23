const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");


// USER ROUTE
router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});


// ADMIN ROUTE
router.get("/admin", protect, adminOnly, (req, res) => {

  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;