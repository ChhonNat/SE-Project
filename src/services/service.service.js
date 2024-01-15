import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createService = (param, contentType) => {
    return httpService._post(API_URL.service.create,param,contentType);
};

const updateService = (id, param, contentType) => {
    return httpService._put(API_URL.service.update+id, param, contentType);
};

const deleteService = (id, contentType) => {
    return httpService._put(API_URL.service.delete + id, contentType);
};

export const Service = {
    createService,
    updateService,
    deleteService
};