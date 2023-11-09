import { useMutation } from "@tanstack/react-query";

import { VersionApi } from "./VersionApi";

const SetVersionQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-version"],
    mutationFn: VersionApi.SetVersion,
  });
  return queryResult;
};

const DeleteVersionQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-version"],
    mutationFn: VersionApi.DeleteVersion,
  });
  return queryResult;
};
export const VersionQueries = {
  SetVersionQuery,
  DeleteVersionQuery,
};
