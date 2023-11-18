import { useMutation, useQuery } from "@tanstack/react-query";
import { ServiceApi } from "./ServiceApi";
import { SalonApi } from "../Salon/SalonApi";
import { ServicePayload } from "./type";

const GetServiceDetailsQuery = (params: ServicePayload) => {
  const queryResult = useQuery({
    queryKey: ["get-service", params.PageNumber, params.Query, params.salonId],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceAll({
        PageNumber: params.PageNumber,
        Query: params.Query,
        EnablePagination: true,
        salonId: params.salonId,
      });
      return data;
    },
    enabled: !!params.salonId,
    select: (data) => data.services,
  });
  return queryResult;
};

const SetServiceQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-service"],
    mutationFn: ServiceApi.SetService,
  });
  return queryResult;
};

export const ServiceQueries = {
  SetServiceQuery,
  GetServiceDetailsQuery,
};
