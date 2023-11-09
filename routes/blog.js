const express = require("express");
const router = express.Router();
const blogModel = require("../models/blogModel");

// get blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json({
      status: "sucess",
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post blogs

router.post("/", async (req, res) => {
  try {
    const { title, description, imgUrl, author, authorId, category } = req.body;

    console.log("body", req.body);

    const blog = await blogModel.create({
      title,
      description,
      imgUrl,
      author,
      authorId,
      category,
    });
    console.log(blog);
    res.status(200).json({
      status: "sucess",
      blog,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// fetch blog by id

router.get("/:blogId", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.blogId);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete blog

router.delete("/:blogId", async (req, res) => {
  try {
    await blogModel.findByIdAndDelete({
      _id: req.params.blogId,
    });
    res.status(200).json({
      message: "Blog Deleted",
    });
  } catch (err) {
    res.json(err);
  }
});

// update blogs

// router.put("/:blogId", async (req, res) => {
//   try {
//     const blog = await blogModel.findByIdAndUpdate(req.params.blogId, req.body);
//     res.status(200).json({
//       status: "sucess",
//       blog,
//     });
//   } catch (err) {
//     throw err;
//   }
// });

router.put("/:blogId", async (req, res) => {
  try {
    const blog = await blogModel.updateOne(
      {
        _id: req.params.blogId,
      },
      req.body // for total array updation
    );
    res.json(blog);
  } catch (err) {
    res.json(err);
  }
});

// get author blogs by his id

router.get("/author/:authorId", async (req, res) => {
  let { authorId } = req.body;
  try {
    const blog = await blogModel.find({ authorId: req.params.authorId });

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
