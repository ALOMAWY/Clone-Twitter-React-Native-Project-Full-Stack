import asyncHandler from "express";

import { clerkClient, getAuth } from "@clerk/express";

import User from "../models/user.model.js";

import Notification from "../models/notification.model.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ user });
});

export const getCurrentProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const existingUser = await User.findOne({ clerkId: userId });

  if (existingUser)
    return res.status(200).json({ error: "User Alraedy Exists" });

  const clerkUser = await clerkClient.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username:
      clerkUser.emailAddresses[0].emailAddress.split("@")[0] + "_" + Date.now(),
    pictureProfile: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);
  res.status(201).json({ user, message: "User Created Successfully" });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (currentUser._id.toString() === targetUserId)
    return res.status(400).json({ error: "you cant follow yourself" });

  if (!currentUser || !targetUser)
    return res.send(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // Unfollow Code

    // Remove From Following List In User
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });

    // Remove From Followers List In Target User
    await User.findByIdAndUpdate(targetUserId._id, {
      $pull: { following: currentUser._id },
    });
  } else {
    // Follow Code

    // Add To Following List In User
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });

    // Add To Followers List In Target User
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUser },
    });

    // Create Notification

    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.send(200).json({
    message: isFollowing
      ? "User Unfollowing successfully"
      : "User Following Successfully",
  });
});
