import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Notification from "../models/notification.model.js";

import cloudinary from "../config/cloudinary.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  //   if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ posts });
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate("user", "username firstname lastname profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstname lastname profilePicture",
      },
    });

  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(200).json({ post });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = User.findOne({ username });

  if (!user) return res.status(404).json({ error: "User not found" });

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstname lastname profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstname lastname profilePicture",
      },
    });

  res.status(200).json({ posts });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ error: "Post must contain either text or image" });
  }

  const user = User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ error: "User not found" });

  let imageUrl = "";

  if (imageFile) {
    try {
      const base64Image = `data:${
        imageFile.mimeType
      };base64,${imageFile.buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary Upload Error" + uploadError);
      res.status(400).json({ error: "Failed to upload image" });
    }
  }

  const post = await Post.create({
    user: user._id,
    content: content,
    image: imageUrl,
  });

  res.status(201).json({ post });
});

export const likePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const post = await Post.findById(postId);
  const user = await User.findOne({ clerkId: userId });

  if (!post || !user)
    return res.status(404).json({ error: "User Or Post not found" });

  // Check if user has already liked the post

  const isLiked = post.likes.includes(user._id);

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, { $pull: { likes: user._id } });
  } else {
    await Post.findByIdAndUpdate(postId, { $push: { likes: user._id } });
  }

  if (user._id.toString() !== post.user.toString()) {
    Notification.create({
      from: user._id,
      to: post.user,
      type: "like",
      post: postId,
    });
  }

  return res.status(200).json({
    message: isLiked ? "Post Unliked Successfully" : "Post Liked Successfully",
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const post = await Post.findById(postId);
  const user = await User.findOne({ clerkId: userId });

  if (!post || !user)
    return res.status(404).json({ error: "User Or Post not found" });

  if (user._id.toString() !== post.user.toString()) {
    return res.status(403).json({
      error: "Unauthorized action - You Can Only Delete Your Own Posts",
    });
  }

  await Comment.deleteMany({ post: post._id });

  await Post.findByIdAndDelete(postId);

  return res.status(200).json({
    message: "Post Deleted Successfully",
  });
});
