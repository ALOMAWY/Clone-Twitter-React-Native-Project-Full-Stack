import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

interface ITrendingTopics {
  topic: string;
  tweets: string;
  trendingIn: string;
}

const TRENDING_TOPICS: ITrendingTopics[] = [
  // { topic: "#ReactNative", tweets: "125k", trendingIn: "Technology" },
  // { topic: "#TypeScript", tweets: "89k", trendingIn: "Technology" },
  // { topic: "#WebDevelopment", tweets: "234k", trendingIn: "Technology" },
  // { topic: "#AI", tweets: "95k", trendingIn: "Technology" },
  // { topic: "#TechNews", tweets: "513k", trendingIn: "Technology" },
  { topic: "#SyriaRevolution", tweets: "95k", trendingIn: "Politics" },
  { topic: "#ردع_العدوان", tweets: "87k", trendingIn: "Idlib" },
  { topic: "#SyriaProtests", tweets: "112k", trendingIn: "Breaking News" },
  { topic: "#SyriaNews", tweets: "256k", trendingIn: "News" },
  { topic: "#Daraa", tweets: "64k", trendingIn: "Syria" },
  { topic: "#SyriaUnrest", tweets: "78k", trendingIn: "World News" },
  { topic: "#SyrianRevolution12Years", tweets: "103k", trendingIn: "Politics" },
  { topic: "#SaveSyria", tweets: "91k", trendingIn: "Global" },
  { topic: "#SyriaSanctions", tweets: "56k", trendingIn: "Economics" },
  { topic: "#ArabSpring", tweets: "72k", trendingIn: "History" },
];
const search = () => {
  return (
    <SafeAreaView className=" bg-white flex-1">
      {/* HEADER  */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder="Search Twitter"
            placeholderTextColor="#657786"
          />
        </View>
      </View>

      {/* TRENDS */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Trending For You
          </Text>
          {TRENDING_TOPICS.map((trend, index) => (
            <TouchableOpacity key={index} className="mb-3">
              <Text className="text-gray-500 text-sm">
                Trending In {trend.trendingIn}
              </Text>
              <Text className="font-bold text-gray-900 text-lg">
                {trend.topic}
              </Text>
              <Text className=" text-gray-500 text-lg">{trend.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default search;
