import { commentApi, useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useComments = () => {
  const [commentText, setCommentText] = useState("");

  const quaryClient = useQueryClient();

  const api = useApiClient();

  const createCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await commentApi.createComment(api, postId, content);
      return response.data;
    },

    onSuccess: () => {
      setCommentText("");
      quaryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      Alert.alert(`Error , ${err}`, "Failed To post comment please try again.");
    },
  });

  const createComment = (postId: string) => {
    if (!commentText.trim()) {
      Alert.alert("Empty Comment", "Please write somthing to add comment!");
    }

    createCommentMutation.mutate({ postId, content: commentText.trim() });
  };
  return {
    commentText,
    setCommentText,
    createComment,
    isCreatingComment: createCommentMutation.isPending,
  };
};

export default useComments;
