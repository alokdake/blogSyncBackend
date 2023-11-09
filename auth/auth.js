const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const { Error } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const signToken = (id, email) => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Register
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", newUser);

    const token = signToken(newUser._id, newUser.email);

    console.log("Generated token:", token);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Authentication failed." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Authentication failed." });
    }

    const token = signToken(user._id, user.email);

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
