import { IPagination, IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import {
  GetAllSalonType,
  GetSalonDetailsParamsType,
  GetSalonDetailsType,
} from "./type";

const GetSalonAll = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IPagination<GetAllSalonType>>(
    API_Routes.Salon.GET_ALL_SALON_CP,
    {
      params: {
        EnablePagination: params.EnablePagination,
        Query: params.Query,
        PageNumber: params.PageNumber,
      },
    }
  );
  return data;
};

const GetSalonDetails = async (params: GetSalonDetailsParamsType) => {
  const { data } = await DeliveryApiInstances.get<
    IPagination<GetSalonDetailsType>
  >(API_Routes.Salon.GET_SALON_DETAILS_CP, {
    params: {
      salonId: params.salonId,
      EnablePagination: params.EnablePagination,
      Query: params.Query,
      PageNumber: params.PageNumber,
    },
  });
  return data;
};

export const SalonApi = {
  GetSalonAll,
  GetSalonDetails,
};
