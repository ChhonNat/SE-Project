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
                message: action?.message
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.error,
                data: [],
                // message: action?.message
            };
        default:
            throw new Error('Should not get there!');
    }
};

const _useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(_httpReducer, {
        loading: true,
        error: null,
        data: null,
        data1: null,
        message: null
    });

    const sendRequest =
        useCallback(
            async (url, method, sendData) => {

                const postData = { ...sendData };

                dispatchHttp({ type: 'SEND' });

                /**
                 * CASE: send request method = 'GET'
                 */
                if (method === 'GET') {

                    await axiosAPI.get(url, postData)
                        .then(function (result) {

                            const { data, success, message } = result?.data;
                            // data.message = message;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success' }) :
                                dispatchHttp({ type: 'ERROR', error: message || 'Error' });
                        })
                        .catch((error) => {

                            console.log('Get error>>>>', error);
                            dispatchHttp({ type: 'ERROR', error: 'Empty Data!' });
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
                            // data.status = success;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success' }) :
                                dispatchHttp({ type: 'ERROR', error: message || 'Error' });

                        })
                        .catch((error) => {

                            console.log('put error >>>>>', error);
                            dispatchHttp({ type: 'ERROR', error: 'Empty Data!' });
                        });
                }

                /**
                 * CASE: send request method = 'PUT'
                 */
                if (method === 'PUT') {

                    await axiosAPI.put(url, postData)
                        .then(function (result) {

                            const { data, success, message } = result?.data;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success' }) :
                                dispatchHttp({ type: 'ERROR', error: message || 'Error' });
                        })
                        .catch((error) => {

                            console.log('put error >>>>>', error);
                            dispatchHttp({ type: 'ERROR', error: error?.message || 'Error' });
                        });
                }

            },
            [],
        );

    return {
        loading: httpState?.loading,
        data: httpState?.data,
        error: httpState?.error,
        message: httpState?.message,
        sendRequest,
    };
};

export default _useHttp;
