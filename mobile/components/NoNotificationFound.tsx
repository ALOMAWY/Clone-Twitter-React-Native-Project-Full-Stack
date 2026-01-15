import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const NoNotificationFound = () => {
  return (
    <View
      className="flex-1 items-center justify-center px-8"
      style={{ minHeight: 400 }}
    >
      <View className="items-center">
        <Feather name="bell" size={80} color={"#e1e8ed"} />
        <Text className="text-2xl font-semibold text-gray-500 mt-6 mb-3">
          No Notifications Yet
        </Text>
        <Text className="text-gray-400 text-center text-base leading-6 max-w-xs">
          When people like, comment, or follow you, you&apos;ll see it here.
        </Text>
      </View>
    </View>
  );
};

export default NoNotificationFound;
