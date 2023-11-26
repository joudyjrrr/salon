import { useMutation, useQuery } from "@tanstack/react-query";
import { FQAApi } from "./FQAApi";

const GetAllFqaQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-all-fqa"],
    queryFn: async () => {
      const data = await FQAApi.GetAllFQA();
      return data;
    },
  });
  return queryResult;
};

const GetFqaByIdQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-fqa-by-id", id],
    queryFn: async () => {
      const data = await FQAApi.GetFQAById(id);
      return data;
    },
  });
  return queryResult;
};

const SetFqaQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["set-fqa"],
    mutationFn: FQAApi.SetFQA,
  });
  return queryResult;
};

const DeleteFqaQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-fqa"],
    mutationFn: FQAApi.DeleteFQA,
  });
  return queryResult;
};

export const FQAQueries = {
  GetAllFqaQuery,
  GetFqaByIdQuery,
  SetFqaQuery,
  DeleteFqaQuery,
};
