
const express = require("express");

const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

// Protected routes
router.post("/", protect, createBlog);

// Keep this before "/:id"
router.get("/my-blogs", protect, getMyBlogs);

router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
