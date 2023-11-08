import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CouponApi } from "./CouponApi";
import { IPayload } from "../../interface/generic";
import { SetCustomerCouponsType } from "./type";

const GetALLCouponsQuery = (params: IPayload) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-infinite-coupon-cp", params.PageNumber, params.Query],

    queryFn: async () => {
      const data = await CouponApi.GetAllCouponsCP({
        Query: params.Query || "",
        PageNumber: params.PageNumber ?? 0,
        EnablePagination: params.EnablePagination || true,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
  });
  return queryResult;
};

const GetCouponQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-coupon", id],
    queryFn: async () => {
      const data = await CouponApi.GetCouponCp(id);
      return data;
    },
  });

  return queryResult;
};

const SetCouponQuery = () => {
  const queryClient = useQueryClient();
  const queryResult = useMutation({
    mutationFn: CouponApi.SetCouponCp,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-infinite-coupon-cp"] });
    },
  });

  return queryResult;
};

const DeleteCouponQuery = () => {
  const queryClient = useQueryClient();
  const queryResult = useMutation({
    mutationFn: CouponApi.DeleteCouponCp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-infinite-coupon-cp"] });
    },
  });
  return queryResult;
};

const GetCustomerCouponsQuery = (params: SetCustomerCouponsType) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-customer-coupons"],
    queryFn: async () => {
      const data = await CouponApi.GetCustomerCoupons({
        isUsed: params.isUsed,
        EnablePagination: params.EnablePagination,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
  });
  return queryResult;
};

export const CouponQueries = {
  GetALLCouponsQuery,
  GetCouponQuery,
  SetCouponQuery,
  DeleteCouponQuery,
  GetCustomerCouponsQuery,
};
