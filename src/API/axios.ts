import { API_BASE_URL } from "./domain";
import axios from "axios";

const DeliveryApiInstances = axios.create({
  baseURL: API_BASE_URL,
});
DeliveryApiInstances.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.setAuthorization(`Bearer ${token}`);
  return config;
});
DeliveryApiInstances.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    } else throw error.response.data.errorMessage;
  }
);
export default DeliveryApiInstances;
