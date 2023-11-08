import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { IPagination, IPayload } from "../../interface/generic";
import { CityApi } from "./CityApi";
import { getCityByCountryType, setCityType } from "./type";

const GetAllCitiesQuery = (payload: IPayload) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["get-city", payload.PageNumber, payload.Query],
    queryFn: async () => {
      const data = await CityApi.GetAllCity({
        PageNumber: payload.PageNumber,
        Query: payload.Query,
        EnablePagination: true,
      });
      return {
        data,
        pageParam: 0,
      };
    },
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.pageNumber < lastPage.data.totalPages
        ? lastPage.pageParam + 1
        : null,
  });
  return queryResult;
};
const GetCityAutoCompleteQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-city-auto-complete"],
    queryFn: async () => {
      const data = await CityApi.GetAllCityAutoComplete({
        EnablePagination: false,
      });
      return data;
    },
    select: (data) =>
      data.data.map((data) => ({
        id: data.id,
        name: data.name,
      })),
  });
  return queryResult;
};

const GetCityByCountryQuery = (params: getCityByCountryType) => {
  const queryResult = useQuery({
    queryKey: [
      "get-city-by-country",
      params.Query,
      params.CountryId,
      params.PageNumber,
    ],
    queryFn: async () => {
      const data = await CityApi.getCityByCountry(params);
      return data;
    },
    enabled: params.enabled,
  });
  return queryResult;
};

const GetCityByIdQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-city-by-id", id],
    queryFn: () => CityApi.getCityById(id),
    enabled: !!id,
  });
  return queryResult;
};

const SetCity = async () => {
  const queryResult = useMutation({
    mutationKey: ["post-city"],
    mutationFn: CityApi.SetCity,
  });
  return queryResult;
};

const DeleteCity = async () => {
  const queryResult = useMutation({
    mutationKey: ["delete-city"],
    mutationFn: CityApi.DeleteCity,
  });
  return queryResult;
};
export const CityQueries = {
  GetAllCitiesQuery,
  GetCityAutoCompleteQuery,
  GetCityByCountryQuery,
  GetCityByIdQuery,
  SetCity,
  DeleteCity,
};
