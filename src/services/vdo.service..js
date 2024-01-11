import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createVdo = (param, contentType) => {
    return httpService._post(API_URL.vdoDemo.create,param,contentType);
};

const updateVdo = (id, param, contentType) => {
    return httpService._put(API_URL.vdoDemo.update+id, param, contentType);
};

const deleteVdo = (id, contentType) => {
    return httpService._put(API_URL.vdoDemo.delete + id, contentType);
};

export const VdoService = {
    createVdo,
    updateVdo,
    deleteVdo
};