import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <SignOutButton />
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
