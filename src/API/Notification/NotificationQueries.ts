import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NotificationApi } from "./NotificationApi";
import { IPayload } from "../../interface/generic";

const SetNotificationCp = () => {
  const queryClient = useQueryClient();
  const queryResult = useMutation({
    mutationKey: ["set-notification-cp"],
    mutationFn: NotificationApi.SetNotificationCp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notification-all"] });
    },
  });
  return queryResult;
};

const DeleteNotificationCp = () => {
  const queryClient = useQueryClient();

  const queryResult = useMutation({
    mutationKey: ["delete-notification-cp"],
    mutationFn: NotificationApi.DeleteNotificationCp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notification-all"] });
    },
  });
  return queryResult;
};

const GetNotificationCp = (params: IPayload) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-notification-all", params.Query, params.PageNumber],
    queryFn: async () => {
      const data = await NotificationApi.GetNotificationCp({
        PageNumber: params.PageNumber ?? 0,
        EnablePagination: params.EnablePagination ?? true,
        Query: params.Query,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
  });
  return queryResult;
};

export const NotificationQueries = {
  SetNotificationCp,
  DeleteNotificationCp,
  GetNotificationCp,
};
