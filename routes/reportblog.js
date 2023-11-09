const express = require("express");
const router = express.Router();
const reportBlogModel = require("../models/reportBlogModel");

//post report

router.post("/", async (req, res) => {
  try {
    const {
      reasons,
      blogId,
      authorId,
      name,
      title,
      author,
      description,
      imgUrl,
      category,
    } = req.body;
    console.log("body", req.body);

    const reportBlog = await reportBlogModel.create({
      reasons,
      blogId,
      authorId,
      name,
      title,
      author,
      description,
      imgUrl,
      category,
    });
    console.log(reportBlog);

    return res
      .status(201)
      .json({ message: "Report submitted successfully", reportBlog });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred while submitting the report" });
  }
});

// get blogs
router.get("/", async (req, res) => {
  try {
    const reportblogs = await reportBlogModel.find();
    res.status(200).json({
      status: "sucess",
      reportblogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete reported blog
router.delete("/:reportId", async (req, res) => {
  try {
    await reportBlogModel.findByIdAndDelete({
      _id: req.params.reportId,
    });
    res.status(200).json({
      message: "Blog Deleted",
    });
  } catch (err) {
    res.json(err);
  }
});

// get author reported blogs by his id
router.get("/author/:authorId", async (req, res) => {
  let { authorId } = req.body;
  try {
    const blog = await reportBlogModel.find({ authorId: req.params.authorId });
    res.status(200).json({
      status: "sucess",
      blog,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

module.exports = router;
