import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";
import { CountryApi } from "./CountryApi";

const GetAllCountryQuery = (params: IPayload) => {
  const queryResult = useQuery({
    queryKey: ["get-all-country", params.PageNumber, params.Query],
    queryFn: async () => {
      const data = await CountryApi.getCpCountry({
        EnablePagination: params.EnablePagination ?? true,
        PageNumber: params.PageNumber,
        Query: params.Query,
      });
      return data
    },
    placeholderData: keepPreviousData,
  });
  return queryResult;
};
const GetCountryAutoCompleteQuery = () => {
  const queryResult = useQuery({
    queryKey: ["get-country-auto-complete"],
    queryFn: async () => {
      const data = await CountryApi.getCpCountry({
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
const GetCountryByIdQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-city-by-id", id],
    queryFn: () => CountryApi.getCountryById(id),
    enabled: !!id,
  });
  return queryResult;
};
const SetCountry = () => {
  const queryResult = useMutation({
    mutationKey: ["post-city"],
    mutationFn: CountryApi.postCountry,
  });
  return queryResult;
};

const DeleteCountry = () => {
  const queryResult = useMutation({
    mutationKey: ["delete-city"],
    mutationFn: CountryApi.RemoveCountry,
  });
  return queryResult;
};

export const CountryQueries = {
  GetAllCountryQuery,
  GetCountryAutoCompleteQuery,
  GetCountryByIdQuery,
  SetCountry,
  DeleteCountry,
};
