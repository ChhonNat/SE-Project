import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getDepartment = (param,contentType) => {
    return httpService._get(API_URL.department.get,param,contentType);
};

export const departmentService = {
    getDepartment
};