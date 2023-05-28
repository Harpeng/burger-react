import { baseUrl } from "../../utils/utils.js";
import { checkResponce } from "../../utils/api.js";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie.js";

//восстановление пароля
export const FORGOT_PASSWORD_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";
export const FORGOT_PASSWORD_SUBMIT = "FORGOT_PASSWORD_FORM_SUBMIT";
export const FORGOT_PASSWORD_SUBMIT_SUCCESS =
  "FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS";
export const FORGOT_PASSWORD_SUBMIT_FAILED =
  "FORGOT_PASSWORD_FORM_SUBMIT_FAILED";

function setFormValue(field, value) {
  return {
    type: FORGOT_PASSWORD_SET_VALUE,
    field,
    value,
  };
}

const submitForm = () => {
  return {
    type: FORGOT_PASSWORD_SUBMIT,
  };
};

const submitSuccesForm = () => {
  return {
    type: FORGOT_PASSWORD_SUBMIT_SUCCESS,
  };
};

const submitFailedForm = () => {
  return {
    type: FORGOT_PASSWORD_SUBMIT_FAILED,
  };
};

const fetchForgotPassword = (email) => {
  return (dispatch) => {
    dispatch(submitForm());
    fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then(checkResponce)
      .then((data) => {
        dispatch(submitSuccesForm(data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(submitFailedForm(error));
      });
  };
};

//сброс пароля
export const RESET_PASSWORD_SET_VALUE = "RESET_PASSWORD_SET_VALUE";
export const RESET_PASSWORD_SUBMIT = "RESET_PASSWORD_SUBMIT";
export const RESET_PASSWORD_SUBMIT_SUCCESS = "RESET_PASSWORD_SUBMIT_SUCCESS";
export const RESET_PASSWORD_SUBMIT_FAILED = "RESET_PASSWORD_SUBMIT_FAILED";

function setPasswordValue(field, value) {
  return {
    type: RESET_PASSWORD_SET_VALUE,
    field,
    value,
  };
}

const submitResetPassword = () => {
  return {
    type: RESET_PASSWORD_SUBMIT,
  };
};

const submitSuccessResetPassword = () => {
  return {
    type: RESET_PASSWORD_SUBMIT_SUCCESS,
  };
};

const submitFailedResetPassword = () => {
  return {
    type: RESET_PASSWORD_SUBMIT_FAILED,
  };
};

const fetchResetPassword = (password) => {
  return (dispatch) => {
    dispatch(submitResetPassword());
    fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    })
      .then(checkResponce)
      .then((data) => {
        dispatch(submitSuccessResetPassword(data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(submitFailedResetPassword(error));
      });
  };
};

//регистрация
export const REGISTER_SET_VALUE = "REGISTER_SET_VALUE";
export const REGISTER_SUBMIT = "REGISTER_SUBMIT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

function setRegisterValue(field, value) {
  return {
    type: REGISTER_SET_VALUE,
    field,
    value,
  };
}

const registerSubmit = () => {
  return {
    type: REGISTER_SUBMIT,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerFailed = () => {
  return {
    type: REGISTER_FAILED,
  };
};

const fetchRegister = (userData) => {
  return (dispatch) => {
    dispatch(registerSubmit());
    fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(checkResponce)
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .then(() => {
        dispatch(registerSuccess);
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(registerFailed(error));
      });
  };
};

//авторизация
export const LOGIN_SET_VALUE = "LOGIN_SET_VALUE";
export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

function setLoginValue(field, value) {
  return {
    type: LOGIN_SET_VALUE,
    field,
    value,
  };
}

const loginSubmit = () => {
  return {
    type: LOGIN_SUBMIT,
  };
};

const loginSuccess = (res) => {
  return {
    type: LOGIN_SUCCESS,
    payload: res.user,
  };
};

const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

const fetchLogin = (userData) => {
  return (dispatch) => {
    dispatch(loginSubmit());
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(loginSuccess(res));
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(loginFailed(error));
      });
  };
};

//проверка авторизации
export const GET_ACCESS_SUCCESS = "GET_ACCESS_SUCCESS";
export const GET_ACCESS_FAILED = "GET_ACCESS_FAILED";

const accessSuccess = (res) => {
  return {
    type: GET_ACCESS_SUCCESS,
    payload: res.user,
  };
};

const accessFailed = () => {
  return {
    type: GET_ACCESS_FAILED,
  };
};

const fetchCheckAccess = (accessToken) => {
  return (dispatch) => {
    fetch(`${baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + getCookie("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessToken),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(accessSuccess(res));
      })
      .catch((error) => {
        console.log(error.message === "jwt expired" || "jwt malformed");
        dispatch(accessFailed(error));
        dispatch(refreshToken("refreshToken"));
      });
  };
};

//обновление токена
const refreshToken = (refreshToken) => {
  return (dispatch) => {
    fetch(`${baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(fetchCheckAccess("accessToken"));
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(accessFailed(error));
      });
  };
};

//изменение данных пользователя
export const UPDATE_INFO_SUBMIT = "UPDATE_INFO_SUBMIT";
export const UPDATE_INFO_SUCCESS = "UPDATE_INFO_SUCCESS";
export const UPDATE_INFO_FAILED = "UPDATE_INFO_FAILED";

const updateRequest = () => {
  return {
    type: UPDATE_INFO_SUBMIT,
  };
};

const updateSuccess = (res) => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: res.user,
  };
};

const updateFailed = () => {
  return {
    type: UPDATE_INFO_FAILED,
  };
};

const fetchUpdateUserInfo = (userData) => {
  return (dispatch) => {
    dispatch(updateRequest());
    fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + getCookie("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(updateSuccess(res));
        localStorage.setItem(res);
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          dispatch(refreshToken("refreshToken")).then(() => {
            fetch(`${baseUrl}/auth/user`, {
              method: "PATCH",
              headers: {
                authorization: "Bearer " + getCookie("accessToken"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then(checkResponce)
              .then((res) => {
                dispatch(updateSuccess(res));
              });
          });
        }
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(updateFailed());
      });
  };
};

// выход из акаунта
export const LOGOUT_SUBMIT = "LOGOUT_SUBMIT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

const logoutRequest = () => {
  return {
    type: LOGOUT_SUBMIT,
  };
};

const logoutSuccess = (res) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: res.user,
  };
};

const logoutFailed = () => {
  return {
    type: LOGOUT_FAILED,
  };
};

const fetchLogout = (refreshToken) => {
  return (dispatch) => {
    dispatch(logoutRequest());
    fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(logoutSuccess(res));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(logoutFailed());
      });
  };
};

export {
  fetchForgotPassword,
  setFormValue,
  submitForm,
  submitSuccesForm,
  submitFailedForm,
  fetchResetPassword,
  setPasswordValue,
  submitResetPassword,
  submitSuccessResetPassword,
  submitFailedResetPassword,
  setRegisterValue,
  fetchRegister,
  fetchLogin,
  setLoginValue,
  fetchLogout,
  refreshToken,
  fetchCheckAccess,
  fetchUpdateUserInfo
};
