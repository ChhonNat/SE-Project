import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const create = (param, contentType) => {
    return httpService._post(API_URL.groupDocument.create,param,contentType);
};

const update = (id, param, contentType) => {
    return httpService._put(API_URL.groupDocument.edit+id, param, contentType);
};
const softDelete = (id) => {
    return httpService._put(API_URL.groupDocument.softDelete+id);
};
const restore = (id) => {
    return httpService._put(API_URL.groupDocument.restore+id);
};

export const groupDocService = {
    create,
    update,
    softDelete,
    restore
};