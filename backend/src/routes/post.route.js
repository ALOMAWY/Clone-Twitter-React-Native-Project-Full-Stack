import express from "express";

import protectedRoute from "../middleware/auth.middleware.js";
import {
  createPost,
  getPost,
  getPosts,
  getUserPosts,
  deletePost,
  likePost,
} from "../controllers/post.controllar.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Pubilc Route
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

// Protected Routes
router.post("/", protectedRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectedRoute, likePost);

router.delete("/:postId", protectedRoute, likePost);

export default router;
