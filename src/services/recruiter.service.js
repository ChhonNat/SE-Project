import { API_URL } from "../constants/apiUrl";
import { httpService } from "./http.service"

const getRecruiter = () => {
    return httpService._get(API_URL.recruiter.get);
};

export const recruiterService = {
    getRecruiter
};