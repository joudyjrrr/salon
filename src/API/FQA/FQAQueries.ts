import { useQuery } from "@tanstack/react-query";
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

const GetFqaById = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-fqa-by-id", id],
    queryFn: async () => {
      const data = await FQAApi.GetFQAById(id);
      return data;
    },
  });
  return queryResult;
};

export const FQAQueries = {
  GetAllFqaQuery,
  GetFqaById,
};
