import express from "express";

import protectedRoute from "../middleware/auth.middleware.js";
import {
  followUser,
  getCurrentProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controllar.js";

const router = express.Router();

// Pubilc Route
router.get("/profile/:username", getCurrentProfile);

// Protected Routes
router.put("/profile", protectedRoute, updateProfile);

router.get("/me", protectedRoute, getCurrentProfile);

router.post("/sync", protectedRoute, syncUser);

router.post("/follow/:tergetUserId", protectedRoute, followUser);

export default router;