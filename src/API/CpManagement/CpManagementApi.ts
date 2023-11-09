import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { GetLogInType, GetRoles, GetUsersType, SetLogInType, SetUserType } from "./type";

const Login = async (payload: SetLogInType) => {
  const { data } = await DeliveryApiInstances.post<GetLogInType>(
    API_Routes.CpManagement.LOGIN_CP,
    payload
  );
  return data;
};
const SetUser = async (params: SetUserType) => {
  const { data } = await DeliveryApiInstances.post(
    API_Routes.CpManagement.SET_USER_CP,
    params
  );
  return data;
};
const GetUsers = async (payload: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<GetUsersType>>(
    API_Routes.Category.GET_ALL_CATEGORY_CP,
    {
      params: {
        ...payload,
      },
    }
  );
  return data;
};
const GetUserById = async (userId: string) => {
  const { data } = await DeliveryApiInstances.get<IPagination<GetUsersType>>(
    API_Routes.Category.GET_ALL_CATEGORY_CP,
    {
      params: {
        userId,
      },
    }
  );
  return data;
};
const DeleteUser = async (UserId: string) => {
  const { data } = await DeliveryApiInstances.delete(
    API_Routes.CpManagement.DELETE_USER_CP,
    {
      params: {
        UserId,
      },
    }
  );
  return data;
};
const GetAllRoles = async () => {
  const { data } = await DeliveryApiInstances.get<GetRoles>(
    API_Routes.CpManagement.GET_ROLES_CP
  );
  return data;
};
export const CpManagementApi = {
  Login,
  SetUser,
  GetUsers,
  GetUserById,
  DeleteUser,
  GetAllRoles,
};
