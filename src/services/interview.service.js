import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const confirmScheduleInterview = (intId, canId, data, contentType) => {
  return httpService._put(
    API_URL.candidate.confirmScheduleInterview +
      `${intId}/candidate/${canId}/confirm-schedule/First_Interview`,
    data,
    contentType
  );
};

const suggestSecScheduleInterview = (intId, canId, data, contentType) => {
  return httpService._put(
    API_URL.interview.suggestSecScheduleInterview +
      `${intId}/candidate/${canId}/second-schedule`,
    data,
    contentType
  );
};

const confirmSecScheduleInterview = (intId, canId, data, contentType) => {
  return httpService._put(
    API_URL.candidate.confirmScheduleInterview +
      `${intId}/candidate/${canId}/confirm-schedule/Second_Interview`,
    data,
    contentType
  );
};

const evaluateInterview = (intId, canId, data, contentType) => {
  return httpService._put(
    API_URL.interview.evaluate + `${intId}/candidate/${canId}`,
    data,
    contentType
  );
};

const referenceCheck = (intId, canId, data, contentType) => {
  return httpService._put(
    API_URL.interview.referenceCheck + `${intId}/candidate/${canId}/process`,
    data,
    contentType
  );
};

export const interviewService = {
  confirmScheduleInterview,
  suggestSecScheduleInterview,
  confirmSecScheduleInterview,
  evaluateInterview,
  referenceCheck,
};
