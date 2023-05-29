import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getRecruiter = () => {
    return httpService._get(API_URL.recruiter.get);
};

export const recruiterService = {
    getRecruiter
};