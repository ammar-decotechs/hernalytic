import { attachToken, privateAPI, publicAPI } from "@/config/config";

export const getDashboardObserver = async () => {
  try {
    attachToken()
    const res = await privateAPI.get("/dashboard/observer");
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

export const getPreviousSurveys = async () => {
  try {
    attachToken()
    const res = await privateAPI.get("/dashboard/observer_previous_surveys");
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

export const getSurveyQuestion = async (id:string) => {
  try {
    attachToken()
    const res = await privateAPI.get(`/survey_questions/${id}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};

export const submitSurvey = async (payload:any) => {
  try {
    attachToken()
    const res = await privateAPI.post("/answers", payload);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log("error", err);
  }
};
