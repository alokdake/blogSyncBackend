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
    res.json(err);
  }
});

// Register

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname, // req.body menas data comes from frontend
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    console.log(newUser);

    // assign token to the user

    const token = signToken(newUser._id, newUser.email);

    console.log(token);

    res.status(200).json({
      status: "Sucess",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    throw err;
  }
});

// Login

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).send("Authentication failed.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Authentication failed.");
    }

    const token = signToken(user._id, user.email);

    res.status(200).json({
      status: "Sucess",
      token,
      user,
    });
  } catch (err) {
    throw err;
  }
});



module.exports = router;
