import { API_URL } from "../constants/apiUrl";
import { httpService } from "./http.service";


const getPosition = () => {
    return httpService._get(API_URL.position.get);
};

export const positionService = {
    getPosition
};