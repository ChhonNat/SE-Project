import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const create = (param, contentType) => {
    return httpService._post(API_URL.screenTicketAsync.create,param,contentType);
};

const update = (id, param, contentType) => {
    return httpService._put(API_URL.childSubCategory.edit+id, param, contentType);
};
const softDelete = (id) => {
    return httpService._put(API_URL.childSubCategory.softDelete+id);
};
const restore = (id) => {
    return httpService._put(API_URL.childSubCategory.restore+id);
};
export const ScreenTicketAsyncData = {
    create,
    update,
    softDelete,
    restore
};