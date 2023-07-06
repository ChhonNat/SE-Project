import axios from "axios";
import apiLink from "../constants/app_cont";
import { LOCAL_STORAGE_KEYS } from "../constants/local_storage";
import { HTTP_STATUS } from "../constants/http_status";
import { API_URL } from "../constants/api_url";
import Swal from "sweetalert2";

const reqHeaders =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'DeviceID': 'xxxxxxx'
};

//Create axios header config
const axiosAPI = axios.create({
    baseURL: apiLink,
    headers: reqHeaders
});

//Intercepter request
await axiosAPI.interceptors.request.use((config) => {

    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.auth.recruitmentUser));

    if (user?.token) {
        config.headers['Authorization'] = 'Bearer ' + user?.token;
    }
    return config;
}, (err) => {

    Promise.reject(err);
});

//Intercepter response
await axiosAPI.interceptors.response.use((res) => {
    return res;
},
    async (err) => {

        const originalRequest = err?.config;

        if (err?.response?.status === HTTP_STATUS.expired && !originalRequest?._retry) {

            originalRequest._retry = true

            try {

                const reqNewToken = await refreshAccessToken();
                console.log('reqNewToken', reqNewToken);

                const { status, data } = reqNewToken;

                if (status === HTTP_STATUS.success) {
                    const newToken = {
                        userName: data?.data?.userName,
                        token: data?.data?.accessToken,
                        refreshToken: data?.data?.refreshToken,
                        isError: false,
                        errorMessage: '',
                        isAuthenticated: true,
                        date: Date().toString()
                    }


                    localStorage.setItem(LOCAL_STORAGE_KEYS.auth.recruitmentUser, JSON.stringify(newToken));
                    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${newToken?.accessToken}`;
                }

            } catch (error) {

                console.log('>>>>>>>>>>>>>>>>>>>>>>>>', error);

                //Clear user from localstorage when refresh token expired 
                localStorage.clear();
                window.location.replace('/login');
            }

            return axiosAPI(originalRequest);
        }

        /**
         * Unauthorize user
         */
        if (err?.response?.status === HTTP_STATUS.unauthorize) {

            return Swal.fire({
                title: 'Accesss denied',
                text: "You don't have the permission on this page!",
                icon: 'info',
                confirmButtonText: 'OK',
            });
        }

        return Promise.reject(err);

    });

//Token refresh token
const refreshAccessToken = async () => {

    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.auth.recruitmentUser));

    return await axios.post(apiLink + API_URL.auth.refreshAccessToken,{ refreshToken: user?.refreshToken }, { headers: reqHeaders });
};


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
    return axiosAPI.delete(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' } });
};


/**
 * method POST is the method to INSERT the data from DB
 * @param {*} endpoint_url is target url request to API
 * @param {*} params is the DATAS submit to API
 * @returns return the response after updated
 */
const _put = async (endpoint_url, params, contentType) => {
    return axiosAPI.put(endpoint_url, params, { headers: { 'Content-Type': contentType ? contentType : 'application/json' } })
};

export default axiosAPI;

export const httpService = {
    _get,
    _post,
    _delete,
    _put,
};
