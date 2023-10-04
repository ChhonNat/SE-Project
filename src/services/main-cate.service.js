import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const create = (param, contentType) => {
    return httpService._post(API_URL.mainCategory.create,param,contentType);
};

const update = (id, param, contentType) => {
    return httpService._put(API_URL.mainCategory.edit+id, param, contentType);
};
const softDelete = (id) => {
    return httpService._put(API_URL.mainCategory.softDelete+id);
};
const restore = (id) => {
    return httpService._put(API_URL.mainCategory.restore+id);
};
export const mainCategoryService = {
    create,
    update,
    softDelete,
    restore
};