import { useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axiosAPI from '../services/http.service';

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
        loading: false,
        error: null,
        data: null,
    });

    const sendRequest = useCallback(async (url, method, sendData) => {

            const postData = { ...sendData };
            dispatchHttp({ type: 'SEND' });

            /**
             * CASE: send request method == 'GET'
             */
            if (method === 'GET') {

                 await axiosAPI.get(url, postData)
                    .then(function (result) {

                        const { data, success, message } = result?.data;
                        success ?
                            dispatchHttp({ type: 'RESPONSE', data }) :
                            dispatchHttp({ type: 'ERROR', error: message });
                    })
                    .catch((error) => {
                        const { message } = error || '';
                        dispatchHttp({ type: 'ERROR', message: message });
                    });
            }

        },[],
    );

    return {
        loading: httpState?.loading,
        data: httpState?.data,
        error: httpState?.error,
        sendRequest,
    };
};

export default _useHttp;
