import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { SalonApi } from "./SalonApi";
import { GetSalonDetailsParamsType } from "./type";

const GetSalonAllQuery = async (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-salon"],
    queryFn: async () => {
      const data = await SalonApi.GetSalonAll({
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

const GetSalonDetailsQuery = async (params: GetSalonDetailsParamsType) => {
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
