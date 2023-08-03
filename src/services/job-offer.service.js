import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const jobOffer = (offId, canId, data, contentType) => {
    return httpService._put(API_URL.jobOffer.offerSalary + `${offId}/candidate/${canId}/offer`, data, contentType);
};

const processJobOffer = (offId, canId, data, contentType) => {
    return httpService._put(API_URL.jobOffer.processJobOffer + `${offId}/candidate/${canId}/process`, data, contentType);
};

const hire = (offId, canId, data, contentType) => {
    return httpService._put(API_URL.jobOffer.hire+`${offId}/candidate/${canId}/hire`,data,contentType);
}

export const jobOfferService = {
    jobOffer,
    processJobOffer,
    hire
};