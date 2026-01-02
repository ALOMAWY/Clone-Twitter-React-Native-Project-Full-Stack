import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = () => {
  const { signOut } = useClerk();
  const handleSignOut = () => {
    Alert.alert("Logut", "Are You Sure You Went To Logout? ", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => signOut() },
    ]);
  };
  return handleSignOut;
};
