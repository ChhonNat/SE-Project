import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getReceiveCategory = (param,contentType) => {
    return httpService._get(API_URL.receiveCategory.get,param,contentType);
};

export const receiveCategoryService  = {
    getReceiveCategory
};