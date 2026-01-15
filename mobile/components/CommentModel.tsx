import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Post } from "@/types";
import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface ICommentProps {
  selectedPost: Post;
  onClose: () => void;
}
const CommentModel = ({ selectedPost, onClose }: ICommentProps) => {
  const { commentText, setCommentText, createComment, isCreatingComment } =
    useComments();

    const { currentUser } = useCurrentUser();

    const handleClose = () => {
      onClose();
      setCommentText("");
    };

    return (
      <Modal
        visible={!!selectedPost}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {/* MODAL HEADER  */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-blue-500 text-lg "> Close</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Comments</Text>
          <View className="w-12"></View>
        </View>

        {selectedPost && (
          <ScrollView className="flex-1">
            <View className="border-b border-gray-100 bg-white p-4 ">
              <View className="flex-row">
                <Image
                  source={{ uri: selectedPost.user.profilePicture }}
                  className="size-12 rounded-full mr-3"
                />

                {/* MAIN POST  */}

                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="font-bold text-gray-900 mr-1">
                      {selectedPost.user.firstName} {selectedPost.user.lastName}
                    </Text>
                    <Text className="text-gray-500 ml-1">
                      @{selectedPost.user.username}
                    </Text>
                  </View>

                  {selectedPost.content && (
                    <Text className="text-gray-900 text-base leading-5 mb-3">
                      {selectedPost.content}
                    </Text>
                  )}

                  {selectedPost.image && (
                    <Image
                      source={{ uri: selectedPost.image }}
                      className="w-full h-48 rounded-2xl border border-gray-300 mb-3"
                      resizeMode="cover"
                    />
                  )}
                </View>

                {/* COMMENTS LIST  */}

                {selectedPost.comments.map((comment) => (
                  <View className="flex-1" key={comment.content}>
                    <View className="flex-row items-center mb-1">
                      <Text className="font-bold text-gray-900 mr-1">
                        {comment.user.firstName} {comment.user.lastName}
                      </Text>
                      <Text className="text-gray-500 ml-1">
                        @{comment.user.username}
                      </Text>
                    </View>
                    <Text className="text-gray-900 text-base leading-5 mb-3">
                      {comment.content}
                    </Text>
                  </View>
                ))}
              </View>
              {/* ADD COMMENT  */}

              <View className="p-4">
                <View className="flex-row">
                  <Image
                    source={{ uri: currentUser?.profilePicture }}
                    className="size-10 rounded-full mr-3"
                  />

                  <View className="flex-1">
                    <TextInput
                      className="border border-gray-200 rounded-lg text-base mb-3 w-7/12"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChangeText={setCommentText}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                    <TouchableOpacity
                      onPress={() => createComment(selectedPost._id)}
                      disabled={isCreatingComment || !commentText.trim()}
                      className={`px-4 py-2 rounded-lg self-start ${commentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                    >
                      {isCreatingComment ? (
                        <ActivityIndicator size={"small"} color={"white"} />
                      ) : (
                        <Text>Reply</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    );
};

export default CommentModel;
