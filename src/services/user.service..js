import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createUser = (param, contentType) => {
    return httpService._post(API_URL.user.create,param,contentType);
};

const updateUser = (id, param, contentType) => {
    return httpService._put(API_URL.user.edit+id, param, contentType);
};

export const userService = {
    createUser,
    updateUser
};