import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { IPaginationService, ServiceGet, ServicePayload, SetServiceType } from "./type";

const GetServiceAll = async (params : ServicePayload) => {
  const { data } = await DeliveryApiInstances.get<IPaginationService>
  (API_Routes.Salon.GET_SALON_DETAILS_CP, {
    params: {
      EnablePagination: params.EnablePagination,
      Query: params.Query,
      PageNumber: params.PageNumber,
      salonId : params.salonId
    },
  });
  return data;
};
const SetService = async (params: SetServiceType) => {
  await DeliveryApiInstances.post(API_Routes.Service.SET_SERVICE_CP, params);
};
export const ServiceApi = {
  SetService,
  GetServiceAll
};
