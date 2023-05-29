import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getReceiveCategory = () => {
    return httpService._get(API_URL.receiveCategory.get)
};

export const receiveCategoryService  = {
    getReceiveCategory
};