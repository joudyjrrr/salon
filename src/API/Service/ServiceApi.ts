import DeliveryApiInstances from "../axios";
import { SetServiceType } from "./type";

const SetService = async (params: SetServiceType) => {
  await DeliveryApiInstances.post(API_Routes.Service.SET_SERVICE_CP, params);
};
export const ServiceApi = {
  SetService,
};
