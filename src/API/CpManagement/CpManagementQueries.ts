import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { GetUsersType } from "./type";
import { CpManagementApi } from "./CpManagementApi";
import { IPayload } from "../../interface/generic";

const LogInQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["login"],
    mutationFn: CpManagementApi.Login,
  });
  return queryResult;
};

const SetUserQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["set-user"],
    mutationFn: CpManagementApi.SetUser,
  });
  return queryResult;
};

const GetUsersQuery = async (params: IPayload) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-infinite-users", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await CpManagementApi.GetUsers({
        EnablePagination: params.EnablePagination,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
  });
  return queryResult;
};
const GetUserByIdQuery = async (userId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: async () => {
      const data = await CpManagementApi.GetUserById(userId);
      return data;
    },
  });
  return queryResult;
};
const DeleteUser = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: CpManagementApi.DeleteUser,
  });
  return queryResult;
};
const GetRoles = async () => {
  const queryResult = useQuery({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const data = await CpManagementApi.GetRoles();
      return data;
    },
  });
  return queryResult;
};
export const CpManagementQueries = {
  LogInQuery,
  SetUserQuery,
  GetUserByIdQuery,
  GetUsersQuery,
  DeleteUser,
  GetRoles,
};
