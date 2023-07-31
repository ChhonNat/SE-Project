import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const evaluateInterview = (intId, canId, data, contentType) => {
    return httpService._put(API_URL.interview.evaluate + `${intId}/candidate/${canId}`, data, contentType);
};

const referenceCheck = (intId, canId, data, contentType) => {
    return httpService._put(API_URL.interview.referenceCheck + `${intId}/candidate/${canId}/process`, data, contentType );
};

export const InterviewService = {
    evaluateInterview,
    referenceCheck
};