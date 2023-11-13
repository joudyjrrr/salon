import {  keepPreviousData, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { SalonApi } from "./SalonApi";
import { GetSalonDetailsParamsType } from "./type";

const GetSalonAllQuery =  (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-salon"],
    queryFn: async () => {
      const data = await SalonApi.GetSalonAll({
        EnablePagination: true,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
     return data 
    },
    placeholderData : keepPreviousData
  });
  
  return queryResult;
};

const GetSalonDetailsQuery =  (params: GetSalonDetailsParamsType) => {
  const queryResult = useQuery({
    queryKey: ["get-salon-details", params.salonId],
    queryFn: async () => {
      const data = await SalonApi.GetSalonDetails({
        salonId: params.salonId,
        EnablePagination: params.EnablePagination,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return data;
    },
  });
  return queryResult;
};

export const SalonQueries = {
  GetSalonAllQuery,
  GetSalonDetailsQuery,
};
