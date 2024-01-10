import axios from 'axios';
import Swal from 'sweetalert2';
import { appConfig } from '../../constants/app_cont';
import { LOCAL_STORAGE_KEYS } from '../../constants/local_storage';
import { authActions } from './authenticationSlice';

const initialUser = {
  email: '',
  userId: '',
  token: '',
  refreshToken: '',
  isError: false,
  errorMessage: '',
  isAuthenticated: false,
  roles: [],
  staffId: ''
};

// export const userAuthentication = ({ username, password }) => {
export const userAuthentication = ({ email, password }) => {


  return async (dispatch) => {

    const options = {
      headers: {
        'Content-Type': 'application/json',
        DeviceID: 'xxxxxxx',
      },
    };

    // const postData = { username, password };
    const postData = { email, password };

    const authenticates = async () => {

      // const response = await axios.post(`${appConfig.apiLink}/api/v1/login`, postData, options)
      const response = await axios.post(`${appConfig.localApi}/api/login`, postData, options)
        .then(function (result) {
          return result;
        })
        .catch((error) => {

          const { data } = error?.response || {};
          const { message } = data;

          Swal.fire({
            title: 'Login',
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK',
          });

          return error;
        });

      const responseData = response?.data?.data;
      const responseUser = {
        username: responseData?.username,
        token: responseData?.token,
        refreshToken: responseData.refreshToken,
        isError: false,
        errorMessage: '',
        isAuthenticated: true,
        roles: responseData?.roles,
        // staffId: responseData?.user?.staffId,
        staffId: responseData?.user_id,
        active: responseData?.status
      };
      return responseUser;
    };

    try {

      const authUser = await authenticates();

      localStorage.setItem(LOCAL_STORAGE_KEYS.auth.user, JSON.stringify(authUser));
      dispatch(authActions.setAuthenticate(authUser));

    } catch (error) {

      dispatch(authActions.setAuthenticate({ ...initialUser }));

      return;
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

    if (!localStorage.getItem(LOCAL_STORAGE_KEYS.auth.user)) {
      storeUser = initialUser;
    } else {
      storeUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.auth.user));
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

