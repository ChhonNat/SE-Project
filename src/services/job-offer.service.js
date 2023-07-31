import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const jobOffer = (offId, canId, data, contentType) => {
    return httpService._put(API_URL.jobOffer.offerSalary + `${offId}/candidate/${canId}/offer`, data, contentType);
};

const processJobOffer = (offId, canId, data, contentType) => {
    return httpService._put(API_URL.jobOffer.processJobOffer + `${offId}/candidate/${canId}/process`, data, contentType);
};


export const offerService = {
    jobOffer,
    processJobOffer
};