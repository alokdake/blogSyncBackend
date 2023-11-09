const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    authorId: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
