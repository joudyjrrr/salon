import { API_Routes } from "../../Constants/ApiRoutes";
import DeliveryApiInstances from "../axios";
import { SetVersionType } from "./type";

const SetVersion = async (params: SetVersionType) => {
  await DeliveryApiInstances.post(API_Routes.Version.SET_VERSION_CP, params);
};

const DeleteVersion = async (id: string) => {
  await DeliveryApiInstances.delete(API_Routes.Version.DELETE_VERSION_CP, {
    params: {
      id,
    },
  });
};

export const VersionApi = {
  SetVersion,
  DeleteVersion,
};
