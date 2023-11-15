const controller = {
  Banner: "Banner",
  Booking: "Booking",
  Cards: "Cards",
  Category: "Category",
  City: "City",
  Country: "Country",
  Coupon: "Coupon",
  CpManagement: "CpManagement",
  Customer: "Customer",
  Employee: "Employee",
  Feedback: "Feedback",
  Fqa: "Fqa",
  Notification: "Notification",
  Permission: "Permission",
  Salon: "Salon",
  SearchWord: "SearchWord",
  Service: "Service",
  Version: "Version",
  file: "File",
};
const Banner = {
  GET_ALL_BANNER_CP: `${controller.Banner}/BannerGetAllCp`,
  GET_BANNER_BY_ID_CP: `${controller.Banner}/BannerGetByIdCp`,
  SET_BANNER_CP: `${controller.Banner}/BannerSetCp`,
  DELETE_BANNER_CP: `${controller.Banner}/BannerDeleteCp`,
};

const Category = {
  GET_ALL_CATEGORY_CP: `${controller.Category}/CategoryGetAllCp`,
  GET_CATEGORY_BY_ID_CP: `${controller.Category}/CategoryGetByIdCp`,
  SET_CATEGORY_CP: `${controller.Category}/CategorySetCp`,
  DELETE_CATEGORY_CP: `${controller.Category}/CategoryDeleteCp`,
};

const City = {
  GET_ALL_CP_City: `/${controller.City}/CityGetAll`,
  CITY_GET_BY_COUNTRY: `${controller.City}/CityGetByCountry`,
  GET_CITY_BY_ID: `/${controller.City}/CityGetById`,
  SET_CITY_CP: `${controller.City}/CitySetCp`,
  DELETE_CITY_CP: `${controller.City}/CityDeleteCp`,
};
const Country = {
  GET_ALL_CP_Country: `/${controller.Country}/CountryGetAll`,
  GET_Country_BY_ID: `/${controller.Country}/CountryGetByIdCp`,
  SET_COUNTRY_CP: `${controller.Country}/CountrySetCp`,
  DELETe_CP_Country: `/${controller.Country}/CountryDeleteCp`,
};

const Coupon = {
  GET_COUPONS_CP: `${controller.Coupon}/GetCouponsCp`,
  GET_COUPON_CP: `${controller.Coupon}/GetCouponCp`,
  SET_COUPON_CP: `${controller.Coupon}/SetCouponCp`,
  DELETE_COUPON_CP: `${controller.Coupon}/DeleteCouponCp`,
  GET_CUSTOMER_COUPONS: `${controller.Coupon}/GetCustomerCuopons`,
};

const CpManagement = {
  LOGIN_CP: `${controller.CpManagement}/LogInCp`,
  SET_USER_CP: `${controller.CpManagement}/SetUserCp`,
  GET_USERS_CP: `${controller.CpManagement}/GetUsersCp`,
  GET_USER_BY_ID_CP: `${controller.CpManagement}/GetUserCpById`,
  DELETE_USER_CP: `${controller.CpManagement}/DeleteCpUser`,
  GET_ROLES_CP: `${controller.CpManagement}/GetRolesCp`,
  GET_CUSTOMERS_NAMES_CP: `${controller.CpManagement}/GetCustomersNamesCp`,
};

const Notifications = {
  GET_ALL_NOTIFICATION_CP: `${controller.Notification}/NotificationGetAllCp`,
  SET_NOTIFICATION_CP: `${controller.Notification}/NotificationSetCp`,
  DELETE_NOTIFICATION_CP: `${controller.Notification}/NotificationDeleteCp`,
};
const Permission = {
  GET_ROLES_CONTENTS: `${controller.Permission}/GetRolesContentsA`,
  GET_CONTENTS_BY_ROLE_ID: `${controller.Permission}/GetContentsByRoleId`,
  SET_PERMISSION: `${controller.Permission}/SetPermission`,
};
const Salon = {
  GET_ALL_SALON_CP: `${controller.Salon}/SalonGetAllCp`,
  GET_SALON_DETAILS_CP: `${controller.Salon}/GetSalonDetailsCp`,
  SET_SALON: `${controller.Salon}/SetSalon`,
  DELETE_SALON: `${controller.Salon}/DeleteSalonCp`
};
const Version = {
  SET_VERSION_CP: `${controller.Salon}/VersionSetCp`,
  DELETE_VERSION_CP: `${controller.Salon}/VersionDeleteCp`,
};
const Service = {
  SET_SERVICE_CP: `${controller.Service}/SetServiceCp`,
};
const Feedback = {
  GET_FEEDBACK_CP: `${controller.Feedback}/Feedback`,
};
const File = {
  GET_FILE_CP: `${controller.file}/SaveFile`,
  DELETE_FILE_CP: `${controller.file}/DeleteFile`,
};

export const API_Routes = {
  Banner,
  Category,
  City,
  Country,
  Coupon,
  CpManagement,
  Notifications,
  Permission,
  Salon,
  Version,
  Service,
  Feedback,
  File,
};
