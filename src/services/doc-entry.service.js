import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";


const createDocEntry = (param, contentType) => {
    return httpService._post(API_URL.docEntry.create,param,contentType);
};

const updateDocEntry = (param, contentType) => {
    return httpService._put(API_URL.docEntry.edit, param, contentType);
};

const getAllDocEntryFile = (id,param,contentType) => {
    return httpService._get(API_URL.docEntry.listAllFile+id, param, contentType);
};

const deleteDocEntry = (id, contentType) => {
    return httpService._put(API_URL.docEntry.delete + id, contentType);
};

const downloadAllFile = (id, contentType) => {
    return httpService._get(API_URL.docEntry.downloadAllFile + id, contentType);
};

export const docEntryService = {
    createDocEntry,
    updateDocEntry,
    getAllDocEntryFile,
    deleteDocEntry,
    downloadAllFile
};