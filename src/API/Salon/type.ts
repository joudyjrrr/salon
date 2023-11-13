import { IPayload } from "../../interface/generic";

export interface GetAllSalonType {
  id: string;
  name: string;
  description: string;
  rate: number;
  logo: string | null;
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
export interface salonType {
  id: number;
  Gender: string;
}
export const SalonTypeArray: salonType[] = [
  { id: 0, Gender: "Male" },
  { id: 1, Gender: "Female" },
];
export interface Day {
  id: number;
  day: string;
}
export const DayArray: Day[] = [
  { id: 0, day: "Sunday" },
  { id: 1, day: "Monday" },
  { id: 2, day: "Tuseday" },
  { id: 3, day: "Wensday" },
  { id: 4, day: "Thursday" },
  { id: 5, day: "Friday" },
  { id: 6, day: "Saturday" },
];
