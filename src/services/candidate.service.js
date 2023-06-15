import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const createCandidate = (data, contentType) => {
    return httpService._post(API_URL.candidate.create, data, contentType );
};

const updateCandidate = (data,id, contentType) => {
    return httpService._update(API_URL.candidate.update+id, data, contentType);
}

export const CandidateService = {
    createCandidate,
    updateCandidate
};