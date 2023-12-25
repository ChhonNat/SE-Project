import { useCallback, useReducer } from 'react';
import axiosAPI from '../services/http.service';

const _httpReducer = (httpState, action) => {

    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: [],
                totalRecords: action?.totalRecords
            };
        case 'RESPONSE':
            return {
                ...httpState,
                loading: false,
                data: action.data,
                message: action?.message,
                totalRecords: action?.totalRecords
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.error,
                data: [],
                totalRecords: action?.totalRecords
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
        message: null,
        totalRecords: 0
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
                            const { data, success, message, totalRecords } = result?.data;
                            // data.message = message;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success', totalRecords: totalRecords }) :
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

                            const { data, success, message, totalRecords } = result?.data;
                            data.message = message;
                            // data.status = success;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success', totalRecords: totalRecords }) :
                                dispatchHttp({ type: 'ERROR', error: message || 'Error' });

                        })
                        .catch((error) => {

                            console.log('post error >>>>>', error);
                            dispatchHttp({ type: 'ERROR', error: 'Empty Data!' });
                        });
                }

                /**
                 * CASE: send request method = 'PUT'
                 */
                if (method === 'PUT') {

                    await axiosAPI.put(url, postData)
                        .then(function (result) {

                            const { data, success, message, totalRecords } = result?.data;

                            // if response success return message, if error return error
                            success ?
                                dispatchHttp({ type: 'RESPONSE', data: data, message: message || 'Success', totalRecords: totalRecords }) :
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
        totalRecords: httpState?.totalRecords,
        sendRequest,
    };
};

export default _useHttp;
