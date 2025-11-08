import express from "express";

import protectedRoute from "../middleware/auth.middleware";
import {
  followUser,
  getCurrentProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controllar";

const router = express.Router();

router.get("/profile/:username", getCurrentProfile);

router.put("/profile", protectedRoute, updateProfile);

router.post("/me", protectedRoute, getCurrentProfile);

router.post("/sync", protectedRoute, syncUser);

router.post("/follow/:tergetUserId", protectedRoute, followUser);

export default router;
