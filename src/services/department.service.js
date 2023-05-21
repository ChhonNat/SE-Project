import { API_URL } from "../constants/apiUrl";
import { httpService } from "./http.service"

const getDepartment = () => {
    return httpService._get(API_URL.department.get);
};

export const departmentService = {
    getDepartment
};