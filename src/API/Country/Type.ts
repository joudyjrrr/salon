import { IValue } from "../../interface/generic";

export interface GetAllCountryType {
  id: string;
  name: string;
  currency: string;
  countryCode: string;
}
export interface SetCountryTypeInput
 {
    id?: string,
    arName: string,
    enName: string,
    currency: string,
    countryCode: string,
}
export interface SetCountryType 
 {
    id?: string,
    name: IValue[];
    currency: string,
    countryCode: string,
}
export interface GetCountryById {
  id: string;
  name: IValue[];
  currency: string;
  countryCode: string;
}
