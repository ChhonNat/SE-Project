import { authActions } from './authenticationSlice';
import axios from 'axios';
import apiLink from '../../constants/app_cont';

const initialUser = {
  userName: '',
  userId: '',
  token: '',
  refreshToken: '',
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
};

export const userAuthentication = ({ username, password }) => {


  return async (dispatch) => {


    const options = {
      headers: {
        'Content-Type': 'application/json',
        DeviceID: 'xxxxxxx',
      },
    };

    const postData = { username, password };

    const authenticates = async () => {

      const response = await axios.post(`${apiLink}/api/v1/login`, postData, options)
        .then(function (result) {
          return result;
        })
        .catch((error) => {
          console.log(error.message);
        });

      const responseData = response.data.data;

      const responseUser = {
        token: responseData.accessToken,
        refreshToken: responseData.refreshToken,
        isError: false,
        errorMessage: '',
        isAuthenticated: true,
      };

      return responseUser;
    };

    try {
      const authUser = await authenticates();
      localStorage.setItem('recruitmentUser', JSON.stringify(authUser));
      dispatch(authActions.setAuthenticate(authUser));

    } catch (error) {

      dispatch(
        authActions.setAuthenticate({
          ...initialUser,
          isError: true,
          errorMessage: error.message,
          isAuthenticated: false,
        })
      );
    }
  };
};

export const isLogin = () => {
  return (dispatch) => {
    let storeUser = null;

    if (!localStorage.getItem('recruitmentUser')) {
      storeUser = initialUser;
    } else {
      storeUser = JSON.parse(localStorage.getItem('recruitmentUser'));
    }

    dispatch(authActions.setAuthenticate(storeUser));
  };
};

export const isLogout = () => {

  return (dispatch) => {
    let storeUser = null;

    localStorage.clear();
    storeUser = initialUser;
    dispatch(authActions.setAuthenticate(storeUser));
  }
}

