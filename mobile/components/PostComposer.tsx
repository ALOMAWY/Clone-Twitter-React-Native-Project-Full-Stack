import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

const PostComposer = () => {
  const {
    content,
    setContent,
    selectedImage,
    isCreating,
    pickImageFromGallery,
    takePhoto,
    removeImage,
    createPost,
  } = useCreatePost();

  const { user } = useUser();

  return (
    <View className="border-b border-gray-100 p-4 bg-white">
      <View className="flex-row">
        <Image
          source={{
            uri:
              user?.imageUrl ||
              "data:image/jpeg;base64,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",
          }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            className="text-gray-900 text-lg"
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={280}
          />
        </View>
      </View>

      {selectedImage && (
        <View className="mt-3 ml-15">
          <View className="relative">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-48 rounded-2xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full items-center justify-center"
              onPress={removeImage}
            >
              <Feather name="x" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row">
          <TouchableOpacity className="mr-4" onPress={pickImageFromGallery}>
            <Feather name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-4" onPress={takePhoto}>
            <Feather name="camera" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          {content.length > 0 && (
            <Text
              className={`text-sm mr-3 ${content.length > 260 ? "text-red-500" : "text-gray-500"}`}
            >
              {280 - content.length}
            </Text>
          )}

          <TouchableOpacity
            className={`px-6 py-2 rounded-full ${
              content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
            }`}
            onPress={createPost}
            disabled={isCreating || !(content.trim() || selectedImage)}
          >
            {isCreating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                className={`font-semibold ${
                  content.trim() || selectedImage
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Post
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PostComposer;
