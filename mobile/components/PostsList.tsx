import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "./PostCard";
import { Post } from "@/types";
import CommentModel from "./CommentModel";

const PostsList = () => {
  const { currentUser } = useCurrentUser();

  const { posts, isLoading, error, toggleLike, deletePost, checkIsLiked } =
    usePosts();

  const [selectedPostId, setSelectedPostId] = useState<null | string>(null);

  const selectedPost = selectedPostId
    ? posts.find((post: Post) => post._id === selectedPostId)
    : null;

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
        <Text className="text-gray-500 mt-2 w-full text-center font-bold ">
          Loading Posts...
        </Text>
      </View>
    );

  if (error)
    return (
      <View className="p-0 items-center">
        <Text className="text-gray-500 mb-4">Failed To Load Posts</Text>
        <TouchableOpacity className="bg-blue-500 px-2 py-2 rounded-lg">
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );

  if (posts.length === 0)
    return (
      <View className="p-8 items-center">
        <Text className="text-gray-500"> No Posts Yet</Text>
      </View>
    );

  return (
    <>
      {posts.map((post: Post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={toggleLike}
          onDelete={deletePost}
          onComment={(post) => setSelectedPostId(post._id)}
          currentUser={currentUser}
          isLiked={checkIsLiked(post.likes, currentUser)}
        />
      ))}

      <CommentModel
        selectedPost={selectedPost}
        onClose={() => setSelectedPostId(null)}
      />
    </>
  );
};

export default PostsList;
