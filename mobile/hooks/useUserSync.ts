import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();

  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),

    onSuccess: (res: any) =>
      console.log("User Synced successfully!", res.data.user),

    onError: (err: any) => console.error("User Sync Failed ", err),
  });

  useEffect(() => {
    // check if user signed in & user is not synced yet, sync user
    if (isSignedIn && syncUserMutation.isIdle) {
      syncUserMutation.mutate();
    }
  }, [isSignedIn]);

  console.log("on");
  return null;
};
