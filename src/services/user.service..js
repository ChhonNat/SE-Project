import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createUser = (param, contentType) => {
    return httpService._post(API_URL.user.create,param,contentType);
};

const updateUser = (id, param, contentType) => {
    return httpService._put(API_URL.user.update+id, param, contentType);
};

const deleteUser = (id, contentType) => {
    return httpService._put(API_URL.user.delete + id, contentType);
};

export const userService = {
    createUser,
    updateUser,
    deleteUser
};