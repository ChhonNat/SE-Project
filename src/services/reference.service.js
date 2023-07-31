import { API_URL } from "../constants/api_url"
import { httpService } from "./http.service"

const evaluateResult = (refId,canId,body,contentType) => {
    return httpService._put(API_URL.referenceCheck.evaluateResult+`${refId}/candidate/${canId}/result`,body,contentType);
};

const offerJob = (refId,intId,canId,contentType) => {
    return httpService?._put(API_URL.referenceCheck.offerJob+`${refId}/interview/${intId}/candidate/${canId}/process`,contentType)
}

export const referenceService = {
    evaluateResult,
    offerJob
};