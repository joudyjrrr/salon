import { useMutation, useQuery } from "@tanstack/react-query";
import { ServiceApi } from "./ServiceApi";
import { SalonApi } from "../Salon/SalonApi";
import { ServicePayload } from "./type";

const GetServiceDetailsQuery = (params: ServicePayload) => {
  const queryResult = useQuery({
    queryKey: ["get-service", params.PageNumber, params.salonId , params.Query],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceAll({
        PageNumber: params.PageNumber,
        Query: params.Query,
        EnablePagination: true,
        salonId: params.salonId,
      });
      return data;
    },
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
const GetServDetailsQuery =  (id : string) => {
  const queryResult = useQuery({
    queryKey: ["get-serv-details",id],
    queryFn: async () => {
      const data = await ServiceApi.GetServiceDetails(id);
      return data;
    },
    enabled : !!id
  });
  return queryResult;
};
export const ServiceQueries = {
  SetServiceQuery,
  GetServiceDetailsQuery,
  GetServDetailsQuery
};
