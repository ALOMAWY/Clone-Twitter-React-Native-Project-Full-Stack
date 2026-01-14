import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Notification from "../models/notification.model.js";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName username profileImage");

  if (!comments) return res.status(404).json({ error: "Comments not found" });

  res.status(200).json({ comments });
});

export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: " Comment content is required" });
  }

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!user || !post) {
    return res.status(404).json({ error: "User or Post not found" });
  }

  const comment = await Comment.create({
    content,
    user: user._id,
    post: post._id,
  });

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

  if (user._id.toString() !== post.user.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "comment",
      comment: comment._id,
    });
  }

  res.status(201).json({ comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  const user = await User.findOne({ clerkId: userId });

  if (!comment || !user)
    return res.status(404).json({ error: "User Or Comment not found" });

  if (user._id.toString() !== comment.user.toString()) {
    return res.status(403).json({
      error: "Unauthorized action - You Can Only Delete Your Own Comments",
    });
  }

  await Post.findByIdAndUpdate(comment.post, {
    $pull: { comments: commentId },
  });
  await Comment.findByIdAndDelete(comment._id);

  return res.status(200).json({
    message: "Comment Deleted Successfully",
  });
});
