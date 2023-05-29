import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const createCandidate = () => {
    return httpService._post(API_URL.candidate.create);
};

export const candidateService = {
    createCandidate
};