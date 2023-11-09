const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// get user by id
router.get("/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user

router.put("/:userID", async (req, res) => {
  try {
    const user = await userModel.updateOne(
      {
        _id: req.params.userID,
      },
      req.body // for total array updation
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// delete user

router.delete("/:userID", async (req, res) => {
  try {
    await userModel.deleteOne({
      _id: req.params.userID,
    });
    res.status(200).json({
      message: "User Deleted",
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
