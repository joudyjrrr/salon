import { useMutation, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { CategoryApi } from "./CategoryApi";

const GetAllCategoryQuery = (payload: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-category", payload.PageNumber, payload.Query],
    queryFn: async () => {
      const data = await CategoryApi.GetAllCategory({
        EnablePagination: true,
        PageNumber: payload.PageNumber,
        Query: payload.Query,
      });
      return data;
    },
  });

  return queryResult;
};
const GetCategoryByIdQuery = async (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-category-by-id", id],
    queryFn: async () => {
      const data = await CategoryApi.getCategoryById(id);
      return data;
    },
  });
  return queryResult;
};
const SetCategoryQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["set-category"],
    mutationFn: CategoryApi.setCategory,
  });
  return queryResult;
};
const DeleteBannerQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: CategoryApi.RemoveCategory,
  });
  return queryResult;
};
export const CategoryQuery = {
  GetAllCategoryQuery,
  GetCategoryByIdQuery,
  SetCategoryQuery,
  DeleteBannerQuery,
};
