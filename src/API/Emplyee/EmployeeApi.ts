import { API_Routes } from "../../Constants/ApiRoutes";
import { IPagination } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { EmployeeAllPayload, EmployeeData, GetEmplyeeAll } from "./type";

const GetEmpoleeAll = async (SalonId: string) => {
  const { data } = await DeliveryApiInstances.get<GetEmplyeeAll[]>(
    API_Routes.Employee.GET_ALL_Employee_CP,
    {
      params: {
        SalonId,
      },
    }
  );
  return data;
};

const SetEmployee = async (params: EmployeeData) => {
    const { data } = await DeliveryApiInstances.post(
      API_Routes.Employee.SET_Employee,
      params
    );
    return data;
  };
  const GetEmpDetails = async (id: string) => {
    const { data } = await DeliveryApiInstances.get<EmployeeData>
    (API_Routes.Employee.GET_Employee_DETAILS_CP, {
      params: {
        id,
      },
    });
    return data;
  };
  const DeleteEmployee = async (employeeId: string) => {
    const { data } = await DeliveryApiInstances.delete(
      API_Routes.Employee.DELETE_Employee,
      {
        params: {
            employeeId,
        },
      }
    );
    return data;
  };
export const EmployeeApi = {
    GetEmpoleeAll,
    SetEmployee,
    DeleteEmployee,
    GetEmpDetails

  };
  