import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { BannerAPI } from "./BannerApi";

const GetAllBannerQuery = async (params: IPayload) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-all-banner", params.Query, params.PageNumber],
    queryFn: async () => {
      const data = await BannerAPI.GetAllBanner({
        EnablePagination: params.EnablePagination,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
    initialPageParam: 0,
  });
  return queryResult;
};

const GetBannerByIdQuery = async (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-banner-by-id", id],
    queryFn: async () => {
      const data = await BannerAPI.GetBannerById(id);
      return data;
    },
  });
  return queryResult;
};

const SetBannerQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["set-banner"],
    mutationFn: BannerAPI.SetBanner,
  });
  return queryResult;
};

const DeleteBannerQuery = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: BannerAPI.DeleteBanner,
  });
  return queryResult;
};

export const BannerQuery = {
  GetAllBannerQuery,
  GetBannerByIdQuery,
  SetBannerQuery,
  DeleteBannerQuery,
};
