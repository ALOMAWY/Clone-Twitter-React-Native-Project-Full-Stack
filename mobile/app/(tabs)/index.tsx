import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";


const HomeScreen = () => {
  useUserSync()
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
