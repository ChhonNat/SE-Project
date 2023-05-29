import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service"

const getDepartment = () => {
    return httpService._get(API_URL.department.get);
};

export const departmentService = {
    getDepartment
};