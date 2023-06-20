import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getRecruiter = (param,contentType) => {
    return httpService._get(API_URL.recruiter.get, param, contentType);
};

export const recruiterService = {
    getRecruiter
};