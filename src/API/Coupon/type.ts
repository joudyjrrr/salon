import { IPayload } from "../../interface/generic";

export interface GetALLCouponsCPType {
  id: string;
  code: string;
  fromDate: Date;
  toDate: Date;
  value: number;
  percent: number;
  cityId: string;
  isExpired: boolean;
}

export interface GetCouponCPType {
  id: string;
  code: string;
  fromDate: Date;
  toDate: Date;
  value: number;
  percent: number;
  cityId: string;
  isExpired: boolean;
}

export interface SetCouponCpType {
  id?: string;
  code: string;
  fromDate: string;
  toDate: string;
  value?: number | undefined;
  percent?: number | undefined;
  cityId: string;
  type: number;
  customers: string[] | undefined;
}

export interface DeleteCouponCpType {
  id: string;
}

export interface SetCustomerCouponsType extends IPayload {
  isUsed: boolean;
}
export interface GetCustomerCouponsType {
  data: {
    id: string;
    name: string;
    code: string;
    percentage: number;
    value: number;
    image: string;
    toDate: Date;
  };
}
