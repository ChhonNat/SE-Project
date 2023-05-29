import { API_URL } from "../constants/api_url"
import { httpService } from "./http.service"

const getBusiness = () => {
    return httpService._get(API_URL.business.get);
};

export const businessService = {
    getBusiness
};