import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { IPayload } from "../../interface/generic";

import { EmployeeAllPayload } from "./type";
import { EmployeeApi } from "./EmployeeApi";

const GetEmployeAllQuery = (salonId: string) => {
  const queryResult = useQuery({
    queryKey: ["get-all-employee", salonId],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpoleeAll(salonId);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResult;
};
const SetEmpQuery = () => {
  const queryResult = useMutation({
    mutationKey: ["set-emp"],
    mutationFn: EmployeeApi.SetEmployee,
  });
  return queryResult;
};
const GetEmpDetailsQuery = (id: string) => {
  const queryResult = useQuery({
    queryKey: ["get-emp-details", id],
    queryFn: async () => {
      const data = await EmployeeApi.GetEmpDetails(id);
      return data;
    },
    enabled: !!id,
  });
  return queryResult;
};

const EmployeeQureis = {
  GetEmployeAllQuery,
  SetEmpQuery,
  GetEmpDetailsQuery
};
export default EmployeeQureis;
