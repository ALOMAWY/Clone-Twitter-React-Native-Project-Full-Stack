import express from "express";

import protectedRoute from "../middleware/auth.middleware.js";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controllar.js";

const router = express.Router();

// Pubilc Route

// Protected Routes
router.post("/", protectedRoute, getNotifications);
router.post("/:notificationId", protectedRoute, deleteNotification);

router.delete("/:postId", protectedRoute, deletePost);

export default router;
