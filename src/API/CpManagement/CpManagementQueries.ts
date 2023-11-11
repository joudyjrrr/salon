import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { CpManagementApi } from "./CpManagementApi";
import { IPayload } from "../../interface/generic";

const LogInQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["login"],
    mutationFn: CpManagementApi.Login,
  });
  return queryResult;
};

const SetUserQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-user"],
    mutationFn: CpManagementApi.SetUser,
  });
  return queryResult;
};

const GetUsersQuery = (params: IPayload) => {
  const queryResult = useQuery({
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
const DeleteUser = () => {
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
      const data = await CpManagementApi.GetAllRoles();
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
