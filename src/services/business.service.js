import { API_URL } from "../constants/api_url"
import { httpService } from "./http.service"

const getBusiness = (param,contentType) => {
    return httpService._get(API_URL.business.get,param,contentType);
};

export const businessService = {
    getBusiness
};