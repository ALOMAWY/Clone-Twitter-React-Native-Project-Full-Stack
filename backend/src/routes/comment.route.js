import express from "express";

import protectedRoute from "../middleware/auth.middleware.js";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controllar.js";

const router = express.Router();

// Pubilc Route
router.get("/", getComments);

// Protected Routes
router.post("/post/:postId", protectedRoute, createComment);
router.delete("/:commentId", protectedRoute, deleteComment);

export default router;
