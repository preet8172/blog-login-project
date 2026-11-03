
const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      image,
      category
    } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      image,
      category,
      author: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid blog ID"
    });
  }
};

// GET MY BLOGS
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this blog"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "content",
      "image",
      "category"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        blog[field] = req.body[field];
      }
    });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this blog"
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
