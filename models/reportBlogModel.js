const mongoose = require("mongoose");

const reportBlogSchema = new mongoose.Schema(
  {
    reasons: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    imgUrl: {
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
const ReportBlog = mongoose.model("ReportBlog", reportBlogSchema);

module.exports = ReportBlog;
