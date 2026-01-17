import express from "express";

import protectedRoute from "../middleware/auth.middleware.js";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controllar.js";

const router = express.Router();

// Pubilc Route

// Protected Routes
router.get("/", protectedRoute, getNotifications);
router.post("/:notificationId", protectedRoute, deleteNotification);


export default router;
