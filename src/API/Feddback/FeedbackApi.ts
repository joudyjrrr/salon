import { API_Routes } from "../../Constants/ApiRoutes";
import { IPayload } from "../../interface/generic";
import DeliveryApiInstances from "../axios";
import { IFeedBackGet } from "./type";

const getFeedBack = async (params: IPayload) => {
  const { data } = await DeliveryApiInstances.get<IFeedBackGet[]>(
    API_Routes.Feedback.GET_FEEDBACK_CP,
    {
      params: {
        ...params,
      },
    }
  );
  return data;
};

export const FeedbackApi = {
  getFeedBack,
};
