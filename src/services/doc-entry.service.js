import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createDocEntry = (param, contentType) => {
    return httpService._post(API_URL.docEntry.create,param,contentType);
};

const updateDocEntry = (id, param, contentType) => {
    return httpService._put(API_URL.docEntry.edit+id, param, contentType);
};

export const docEntryService = {
    createDocEntry,
    updateDocEntry
};