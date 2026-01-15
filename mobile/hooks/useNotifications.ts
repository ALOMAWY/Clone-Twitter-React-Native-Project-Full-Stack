import { useApiClient } from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const useNotifications = () => {
  const quaryClient = useQueryClient();
  const api = useApiClient();

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["notifictions"],
    queryFn: () => api.get("/notifications"),
    select: (res: any) => res.data.notifications,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      api.delete(`/notifications/${notificationId}`);
    },
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {},
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };
  return {
    notifications: notificationsData,
    isLoading,
    refetch,
    isRefetching,
    error,
    deleteNotification,
    isDeletingNotification: deleteNotificationMutation.isPending,
  };
};
