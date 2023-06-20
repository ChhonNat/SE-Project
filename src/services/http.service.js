import axios from "axios";
import apiLink from "../constants/app_cont";

const userLogined = JSON.parse(localStorage.getItem('recruitmentUser'));

const axiosAPI = axios.create({
    baseURL: apiLink,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userLogined?.token,
        'DeviceID': 'xxxxxxx'
    },
});


/**
 * method GET is the method to RETRIEVE the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the OPTIONS submit to API
 * @returns return the response after getted
 */
const _get = async (endpoint_url, params, contentType) => {

    return axiosAPI.get(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' } })
};


/**
 * method POST is the method to INSERT the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the DATAS submit to API
 * @returns return the response after updated
 */
const _post = async (endpoint_url, params, contentType) => {
    return axiosAPI.post(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' } });
};

/**
 * method DELETE is the method to remove the data from DB
 * @param {*} endpoint_url is the target url request to API
 * @param {*} params is option submit to API
 * @returns return the response after deleted
 */
const _delete = async (endpoint_url, params, contentType) => {
    return axiosAPI.delete(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' }});
};


/**
 * method POST is the method to INSERT the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the DATAS submit to API
 * @returns return the response after updated
 */
const _put = async (endpoint_url, params, contentType) => {
    return axiosAPI.put(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' }})
};

export default axiosAPI;

export const httpService = {
    _get,
    _post,
    _delete,
    _put,
};
