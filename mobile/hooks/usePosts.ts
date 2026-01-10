import { postApi, useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = () => {
  const api = useApiClient();
  const quaryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postApi.getPosts(api),
    select: (res) => res.data.posts,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(api, postId),
    onSuccess: () => quaryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ["posts"] });
      quaryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });

  const checkIsLiked = (postsLikes: string[], currentUser: any) =>
    postsLikes.includes(currentUser._id);

  return {
    posts: postsData || {},
    isLoading,
    error,
    refetch,
    toggleLike: (postId: string) => likePostMutation.mutate(postId),
    deletePost: (postId: string) => deletePostMutation.mutate(postId),
    checkIsLiked,
  };
};
