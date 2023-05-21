import axios from "axios";
import apiLink from "../constants/appCont";

const userLogined = JSON.parse(localStorage.getItem('recruitmentUser'));

const API = axios.create({
    baseURL: apiLink,
    headers: {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
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
const _get = async (endpoint_url, params) => {

    return API.get(endpoint_url, params)
};


/**
 * method POST is the method to INSERT the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the DATAS submit to API
 * @returns return the response after updated
 */
const _post = async (endpoint_url, params) => {
    return API.post(endpoint_url, params);
};

/**
 * method DELETE is the method to remove the data from DB
 * @param {*} endpoint_url is the target url request to API
 * @param {*} params is option submit to API
 * @returns return the response after deleted
 */
const _delete = async (endpoint_url, params) => {
    return API.delete(endpoint_url, params);
};


/**
 * method POST is the method to INSERT the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the DATAS submit to API
 * @returns return the response after updated
 */
const _update = async (endpoint_url, params) => {
    return API.put(endpoint_url,params)
};

export const httpService = {
    _get,
    _post,
    _delete,
    _update
};
