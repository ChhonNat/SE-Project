import { httpService } from "./http.service"

const getData = (endpoint_url, param, contentType) => {
    return httpService._get(endpoint_url, param, contentType);
};

export const globalService = {
    getData
};