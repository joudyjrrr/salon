export interface GetAllCountryType {
  data: {
    id: string;
    name: string;
    currency: string;
    countryCode: string;
  };
}
export interface SetCountryType {
  id: string;
  name: {
    key: string;
    value: string;
  }[];
  currency: string;
  countryCode: string;
}
export interface GetCountryById {
  id: string;
  name: string;
  currency: string;
  countryCode: string;
}
