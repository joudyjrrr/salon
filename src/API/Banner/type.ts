export interface GetAllBannerCpType {
  
    id: string;
    fromDate: string;
    toDate: string;
    link: string;
    serviceId: string;
    salonId: string;
    imageURl: string;
  
}
export interface GetBannerByIdType {
  id: string;
  fromDate: string;
  toDate: string;
  link: string;
  servicedId: string;
  salonId: string;
  imageURl: string;
}
export interface SetBannerType {
  id: string;
  fromDate: string;
  toDate: string;
  link: string;
  servicedId: string;
  salonId: string;
  image: string;
  citytId: string;
}
