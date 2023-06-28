import { useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axiosAPI from '../services/http.service';
import { HTTP_STATUS } from '../constants/http_status';
import { API_URL } from '../constants/api_url';

const _httpReducer = (httpState, action) => {

    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: [],
            };
        case 'RESPONSE':
            return {
                ...httpState,
                loading: false,
                data: action.data,
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.error,
                data: [],
            };
        default:
            throw new Error('Should not get there!');
    }
};

const _useHttp = () => {

    const user = useSelector(state => state.user);

    const [httpState, dispatchHttp] = useReducer(_httpReducer, {
        loading: true,
        error: null,
        data: null,
        message: null
    });

    const sendRequest = useCallback(async (url, method, sendData) => {

        const refreshAccessToken = async () => {
            await axiosAPI
                .post(API_URL.auth.refreshAccessToken,
                    { refreshToken: user?.refreshToken }
                )
                .then(function (res) {
                    const { result, msg } = res?.data;

                    if (result === 'error') {

                        dispatchHttp({ type: 'ERROR', data: msg });
                    } else {

                        const { data } = res?.data;
                        const newToken = {
                            userName: data?.userName,
                            accessToken: data?.accessToken,
                            refreshToken: data?.refreshToken,
                            isError: false,
                            errorMessage: '',
                            isAuthenticated: true,
                            date: Date().toString()
                        }


                    }
                })
                .catch((err) => {
                    console.log('refresh token err', err);
                });
        };

        axiosAPI.interceptors.response.use(
            (res) => {
                return res;
            },
            async (err) => {

                let originalRequest = err?.config;
                if (err?.response?.status === HTTP_STATUS.expired && !originalRequest?._retry) {

                    originalRequest._retry = true

                    await refreshAccessToken();

                    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${user?.accessToken}`;

                    return axiosAPI(originalRequest);
                }


                return Promise.reject(err);

            });


        const postData = { ...sendData };

        dispatchHttp({ type: 'SEND' });

        /**
         * CASE: send request method = 'GET'
         */
        if (method === 'GET') {

            await axiosAPI.get(url, postData)
                .then(function (result) {

                    const { data, success, message } = result?.data;
                    data.message = message;

                    success ?
                        dispatchHttp({ type: 'RESPONSE', data }) :
                        dispatchHttp({ type: 'ERROR', error: message });
                })
                .catch((error) => {

                    const { message } = error || '';
                    dispatchHttp({ type: 'ERROR', message: message });
                });
        }

        /**
        * CASE: send request method = 'POST'
        */
        if (method === 'POST') {

            await axiosAPI.post(url, postData)
                .then(function (result) {

                    const { data, success, message } = result?.data;
                    data.message = message;

                    success ?
                        dispatchHttp({ type: 'RESPONSE', data }) :
                        dispatchHttp({ type: 'ERROR', error: message });
                })
                .catch((error) => {

                    const { message } = error || '';
                    dispatchHttp({ type: 'ERROR', message: message });
                });
        }

        /**
         * CASE: send request method = 'PUT'
         */
        if (method === 'PUT') {

            await axiosAPI.put(url, postData)
                .then(function (result) {

                    const { data, success, message } = result?.data;
                    data.message = message;

                    success ?
                        dispatchHttp({ type: 'RESPONSE', data }) :
                        dispatchHttp({ type: 'ERROR', error: message });
                })
                .catch((error) => {

                    const { message } = error || '';
                    dispatchHttp({ type: 'ERROR', message: message });
                });
        }

    }, [],
    );

    return {
        loading: httpState?.loading,
        data: httpState?.data,
        error: httpState?.error,
        message: httpState?.data?.message,
        sendRequest,
    };
};

export default _useHttp;
