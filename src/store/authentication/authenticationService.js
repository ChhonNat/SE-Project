//import { APP_CONSTANT } from '../../constant/appContant';
import { authActions } from "./authenticationSlice";
import apiLink from "../../constants/appCont";
import axios from "axios";

const initialUser = {
  userName: "",
  userId: "",
  token: "",
  refreshToken: "",
  isError: false,
  errorMessage: "",
  isAuthenticated: false,
};

export const userAuthentication = ({ username, password }) => {
  return async (dispatch) => {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        DeviceID: "xxx00010222",
        DeviceType: "hello",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const postData = { username, password };

    const authenticates = async () => {
      const response = await axios
        .post(`${apiLink}/api/v1/login`, JSON.stringify(postData), options)
        .then(function (result) {
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log(error.message);
        });

      const responseUser = {
        userName: `${response.data.info.firstName} ${response.data.info.secondName}`,
        userId: response.data.info.id,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isError: false,
        errorMessage: "",
        isAuthenticated: true,
      };

      return responseUser;
    };

    try {
      const authUser = await authenticates();

      localStorage.setItem("mentorUser", JSON.stringify(authUser));

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

    if (!localStorage.getItem("mentorUser")) {
      storeUser = initialUser;
    } else {
      storeUser = JSON.parse(localStorage.getItem("mentorUser"));
    }

    dispatch(authActions.setAuthenticate(storeUser));
  };
};
