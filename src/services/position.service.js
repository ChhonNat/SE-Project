import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const getPosition = (param, contentType) => {
    return httpService._get(API_URL.position.get,param,contentType);
};

export const positionService = {
    getPosition
};