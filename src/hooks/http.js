import axios from 'axios';
import {useReducer, useCallback} from 'react';
import {useSelector} from 'react-redux';

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

      dispatchHttp({type: 'SEND'});

      if (method === 'POST') {
        const postData = {...sendData, AuthToken: user.accessToken};
        //console.log(postData);
        await axios
          .post(url, postData, options)
          .then(function (result) {
            if (result.data.result === 'error') {
              if (result.data.data === 'Need Login again') {
                dispatchHttp({type: 'ERROR', data: 'Need Login again'});
              }
            } else {
              dispatchHttp({type: 'RESPONSE', data: result.data.data});
            }
          })
          .catch(error => {
            // console.log(error.message);
            dispatchHttp({type: 'ERROR', error: error.message});
          });
      } else {
        await axios
          .get(url, sendData, options)
          .then(function (result) {
            dispatchHttp({type: 'RESPONSE', data: result.data.data});
          })
          .catch(error => {
            // console.log(error.message);
            dispatchHttp({type: 'ERROR', error: error.message});
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
