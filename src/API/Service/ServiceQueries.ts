import { useMutation } from "@tanstack/react-query";
import { ServiceApi } from "./ServiceApi";

const SetServiceQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-service"],
    mutationFn: ServiceApi.SetService,
  });
  return queryResult;
};

export const ServiceQueries = {
  SetServiceQuery,
};
