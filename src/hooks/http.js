import axios from 'axios';
import { useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';
import apiLink from '../constants/app_cont';

const httpReducer = (httpState, action) => {
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

const useHttp = () => {
  const user = useSelector(state => state.user);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (url, method, sendData) => {

      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      // When token expire
      const refreshAccessToken = async () => {

        await axios
          .post(`${apiLink}/api/v1/login/renew-token`,{refreshToken: user.refreshToken},options)
          .then(function (result) {

            if (result.data.result === 'error') {

              dispatchHttp({ type: 'ERROR', data: result.data.msg });
            } else {

              const response = result.data.data;

              const token = {
                userName: response.userName,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                isError: false,
                errorMessage: '',
                isAuthenticated: true,
                date: Date().toString(),
              };

              localStorage.setItem('recruitmentUser', JSON.stringify(token));

              dispatch(isLogin());

              return token;
            }
          })
          .catch((error) => {
            dispatchHttp({
              type: 'ERROR',
              error: `${error.response.statusText} : Status Code = ${error.response.status}`,
            });

            return false;
          });
      };

      // interceptor
      const customAxios = axios.create();

      customAxios.interceptors.request.use(
        async (config) => {

          if (user.accessToken) {

            config.headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accessToken}`,
              'Access-Control-Allow-Origin': '*',
            };

            return config;
          }

          if (localStorage.getItem("recruitmentUser")) {
            config.headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('recruitmentUser')).accessToken}`,
              'Access-Control-Allow-Origin': '*',
            };

            return config;

          }

          config.headers = {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${user.accessToken}`,
            'Access-Control-Allow-Origin': '*',
          };

          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );

      customAxios.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const originalRequest = error.config;
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessToken();

            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${user.accessToken}`;

            return customAxios(originalRequest);
          }
          return Promise.reject(error);
        }
      );
      ////////Custom Axios and interceptor////////////

      dispatchHttp({ type: 'SEND' });

      if (method === 'POST') {
        const postData = { ...sendData, AuthToken: user.accessToken };
        await axios
          .post(url, postData, options)
          .then(function (result) {
            if (result.data.result === 'error') {
              if (result.data.data === 'Need Login again') {
                dispatchHttp({ type: 'ERROR', data: 'Need Login again' });
              }
            } else {
              dispatchHttp({ type: 'RESPONSE', data: result.data.data });
            }
          })
          .catch(error => {
            console.log(error.message);
            dispatchHttp({ type: 'ERROR', error: error.message });
          });
      } else {
        await axios
          .get(url, sendData, options)
          .then(function (result) {
            dispatchHttp({ type: 'RESPONSE', data: result.data.data });
          })
          .catch(error => {
            console.log(error.message);
            dispatchHttp({ type: 'ERROR', error: error.message });
          });
      }
    },
    [dispatchHttp, user.accessToken],
  );

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
  };
};

export default useHttp;
