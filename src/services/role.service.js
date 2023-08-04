import { API_URL } from "../constants/api_url"
import { httpService } from "./http.service"

const getRole = (param, contentType) => {
    return httpService._get(API_URL.role.get, param, contentType);
};

export const roleService = {
    getRole
};