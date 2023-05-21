import { httpService } from "./http.service"

const getData = (endpoint_url) => {
    return httpService._get(endpoint_url);
};

export const globalService = {
    getData
};