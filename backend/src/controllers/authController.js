const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generatetoken");


// REGISTER USER
const registerUser = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    console.log(name, email, password);

    // Check existing user
    const userExists = await User.findOne({ email });

    console.log("USER EXISTS CHECK DONE");

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    console.log("SALT CREATED");

    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("PASSWORD HASHED");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("USER CREATED");

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Check inactive status
    if (user.status === "Inactive") {
      return res.status(403).json({
        message: "Account inactive. Contact admin.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};