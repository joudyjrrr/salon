import { IPayload } from "../../interface/generic";

export interface GetAllSalonType {
  id: string;
  name: string;
  description: string;
  rate: number;
  logo: string;
  salonType: 0;
}
export interface GetSalonDetailsParamsType extends IPayload {
  salonId: string;
}
export interface GetSalonDetailsType {
  name: string;
  description: string;
  rate: number;
  phoneNumber: string;
  tempPhoneNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  logo: string;
  salonType: number;
  address: {
    id: string;
    latitude: number;
    longitude: number;
    neighborhood: string;
    streetName: string;
    floorNo: number;
    builderNumber: string;
    addressDescription: string;
    appartmentNumber: string;
    formatedAddres: string;
    cityName: {
      key: string;
      value: string;
    }[];
  };
  services: {
    data: {
      id: string;
      name: string;
      price: number;
      offerPrice: number;
      rate: number;
      coverImage: string;
    }[];
  };
}
