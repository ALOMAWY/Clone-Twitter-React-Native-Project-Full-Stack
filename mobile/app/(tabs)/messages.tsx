import {
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { CONVERSATIONS, ConversationType } from "@/data/conversations";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState<string>("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are You Sure you went to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setConversationsList(
              conversationsList.filter((conv) => conv.id !== conversationId)
            ),
        },
      ]
    );
  };
  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModel = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };
  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // update last message in conversation

      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        "Your message has been sent to " + selectedConversation.user.name
      );
    }
  };
  // const closeChatModel = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <Feather name="edit" size={24} color="#1DA1F2" />
      </View>

      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder="Search for people and groups"
            placeholderTextColor="#657786"
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationsList.map((conv, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
            onPress={() => openConversation(conv)}
            onLongPress={() => deleteConversation(conv.id)}
          >
            <Image
              source={{ uri: conv.user.avatar }}
              className="size-12 rounded-full mr-3"
            />

            {/* Conversation Infos */}

            {/* Container */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                {/* User */}
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-gray-900">
                    {conv.user.name}
                  </Text>
                  {conv.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color={"#1DA1F2"}
                      className="ml-1"
                    />
                  )}
                  <Text className="text-gray-500 text-sm ml-1">
                    @{conv.user.username}
                  </Text>
                </View>
                {/* Last Message */}
                <Text
                  className="text-sm text-gray-500 text-center"
                  numberOfLines={1}
                >
                  {conv.lastMessage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <Text className="text-xs text-gray-500 text-center">
          Tap to open * Long press to delete
        </Text>
      </View>

      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedConversation && (
          <>
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
              <TouchableOpacity onPress={closeChatModel} className="mr-3">
                <Feather name="arrow-left" size={24} color={"#1DA1F2"} />
              </TouchableOpacity>
              <Image source={{ uri: selectedConversation.user.avatar }} />

              {/* Chat Header */}
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="font-semibold text-gray-900 mr-1">
                    {selectedConversation.user.name}
                  </Text>
                </View>
              </View>
            </View>

            <ScrollView className="flex-1 px-4 py-4">
              <View className="mb-4">
                <Text className="text-center text-gray-400 text-sm mb-4">
                  This Is the biginning of your conversation with
                  {selectedConversation.user.name}
                </Text>
              </View>

              {/* Conversation Messages  */}

              {selectedConversation.messages.map((msg, index) => (
                <View
                  key={index}
                  className={`flex-row mb-3 ${msg.fromUser ? "justify-end" : ""}`}
                >
                  {!msg.fromUser && (
                    <Image
                      source={{ uri: selectedConversation.user.avatar }}
                      className="rounded-full size-10 mr-3"
                    />
                  )}
                  <View className={`flex-1 ${msg.fromUser ? "items-end" : ""}`}>
                    <View
                      className={`rounded-2xl px-4 py-3 max-w-xs ${msg.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
                    >
                      <Text
                        className={` ${msg.fromUser ? "text-white" : "text-gray-900"}`}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text>{msg.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Message Input */}

            <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
              <View className="flex-1 flex-row items-center justify-between bg-gray-100 rounded-full px-3">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor={"#657786"}
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  className={`size-10 rounded-full items-center justify-center ${newMessage.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                  disabled={!newMessage.trim()}
                >
                  <Feather name="send" size={20} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;
