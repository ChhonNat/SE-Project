import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const create = (param, contentType) => {
    return httpService._post(API_URL.subCategory.create,param,contentType);
};

const update = (id, param, contentType) => {
    return httpService._put(API_URL.subCategory.edit+id, param, contentType);
};
const softDelete = (id) => {
    return httpService._put(API_URL.subCategory.softDelete+id);
};
const restore = (id) => {
    return httpService._put(API_URL.subCategory.restore+id);
};
export const subCategoryService = {
    create,
    update,
    softDelete,
    restore
};