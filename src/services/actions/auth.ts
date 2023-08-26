import {resetPasswordUrl, forgotPasswordUrl, checkAccessUrl, tokenUrl, logoutUrl, loginUrl, registerUrl, orderUrl } from "../../utils/utils";
import { checkResponce } from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import {FORGOT_PASSWORD_SET_VALUE, FORGOT_PASSWORD_SUBMIT, FORGOT_PASSWORD_SUBMIT_SUCCESS, FORGOT_PASSWORD_SUBMIT_FAILED, RESET_PASSWORD_SET_VALUE, RESET_PASSWORD_SUBMIT, RESET_PASSWORD_SUBMIT_SUCCESS, RESET_PASSWORD_SUBMIT_FAILED, REGISTER_SET_VALUE, REGISTER_SUBMIT, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_SET_VALUE, LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_FAILED, GET_ACCESS_SUCCESS, GET_ACCESS_FAILED, GET_ACCESS_LOADED, UPDATE_INFO_SUBMIT, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAILED, LOGOUT_SUBMIT, LOGOUT_SUCCESS, LOGOUT_FAILED} from "../constants/index";
import { AppDispatch } from '../type/index';
import { ILogin, IUser, IResetPassword, IChangeUserInfo, IRegister} from '../type/data';



//восстановление пароля
export interface IForgotPasswordSetValue {
  readonly type: typeof FORGOT_PASSWORD_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IForgotPasswordSubmitValue {
  readonly type: typeof FORGOT_PASSWORD_SUBMIT;
}

export interface IForgotPasswordSuccessValue {
  readonly type: typeof FORGOT_PASSWORD_SUBMIT_SUCCESS;
}

export interface IForgotPasswordFailedValue {
  readonly type: typeof FORGOT_PASSWORD_SUBMIT_FAILED;
}


function setFormValue(field:string, value:string):IForgotPasswordSetValue {
  return {
    type: FORGOT_PASSWORD_SET_VALUE,
    field,
    value,
  };
}


const submitForm = ():IForgotPasswordSubmitValue => {
  return {
    type: FORGOT_PASSWORD_SUBMIT,
  };
};

const submitSuccesForm = ():IForgotPasswordSuccessValue => {
  return {
    type: FORGOT_PASSWORD_SUBMIT_SUCCESS,
  };
};

const submitFailedForm = ():IForgotPasswordFailedValue => {
  return {
    type: FORGOT_PASSWORD_SUBMIT_FAILED,
  };
};

const fetchForgotPassword = (email:{ email: string }, callback: () => void) => {
  return (dispatch: AppDispatch) => {
    dispatch(submitForm());
    fetch(forgotPasswordUrl, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then(checkResponce)
      .then(() => {
        dispatch(submitSuccesForm());
        callback();
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(submitFailedForm());
      });
  };
};

//сброс пароля

export interface ISetPasswordValue {
  readonly type: typeof RESET_PASSWORD_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IPasswordSubmitValue {
  readonly type: typeof RESET_PASSWORD_SUBMIT;
}

export interface IPasswordSuccessValue {
  readonly type: typeof RESET_PASSWORD_SUBMIT_SUCCESS;
}

export interface IPasswordFailedValue {
  readonly type: typeof RESET_PASSWORD_SUBMIT_FAILED;
}

function setPasswordValue(field:string, value:string):ISetPasswordValue {
  return {
    type: RESET_PASSWORD_SET_VALUE,
    field,
    value,
  };
}

const submitResetPassword = ():IPasswordSubmitValue => {
  return {
    type: RESET_PASSWORD_SUBMIT,
  };
};

const submitSuccessResetPassword = ():IPasswordSuccessValue => {
  return {
    type: RESET_PASSWORD_SUBMIT_SUCCESS,
  };
};

const submitFailedResetPassword = ():IPasswordFailedValue => {
  return {
    type: RESET_PASSWORD_SUBMIT_FAILED,
  };
};

const fetchResetPassword = (password:IResetPassword) => {
  return (dispatch: AppDispatch) => {
    dispatch(submitResetPassword());
    fetch(resetPasswordUrl, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    })
      .then(checkResponce)
      .then(() => {
        dispatch(submitSuccessResetPassword());
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(submitFailedResetPassword());
      });
  };
};

//регистрация

export interface ISetRegisterValue {
  readonly type: typeof REGISTER_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IRegisterSubmit {
  readonly type: typeof REGISTER_SUBMIT;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterFailed{
  readonly type: typeof REGISTER_FAILED;
}

function setRegisterValue(field:string, value:string):ISetRegisterValue {
  return {
    type: REGISTER_SET_VALUE,
    field,
    value,
  };
}

const registerSubmit = ():IRegisterSubmit => {
  return {
    type: REGISTER_SUBMIT,
  };
};

const registerSuccess = ():IRegisterSuccess => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerFailed = ():IRegisterFailed => {
  return {
    type: REGISTER_FAILED,
  };
};

const fetchRegister = (userData:IRegister, callback: () => void) => {
  return (dispatch: AppDispatch) => {
    dispatch(registerSubmit());
    fetch(registerUrl, {
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
        callback();
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(registerFailed());
      });
  };
};

//авторизация
export interface ISetLoginValue {
  readonly type: typeof LOGIN_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface ILoginSubmit {
  readonly type: typeof LOGIN_SUBMIT;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: IUser;
  readonly dataUtser: IUser;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

function setLoginValue(field:string, value:string):ISetLoginValue {
  return {
    type: LOGIN_SET_VALUE,
    field,
    value,
  };
}

const loginSubmit = ():ILoginSubmit => {
  return {
    type: LOGIN_SUBMIT,
  };
};

const loginSuccess = (user:IUser):ILoginSuccess => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
    dataUtser: user,
  };
};

const loginFailed = ():ILoginFailed => {
  return {
    type: LOGIN_FAILED,
  };
};

const fetchLogin = (userData:ILogin) => {
  return (dispatch: AppDispatch) => {
    dispatch(loginSubmit());
    fetch(loginUrl, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(loginSuccess(res.user));
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(loginFailed());
      });
  };
};

//проверка авторизации
export interface IGetAccessLoaded {
  readonly type: typeof GET_ACCESS_LOADED;
}

export interface IAccessSuccess {
  readonly type: typeof GET_ACCESS_SUCCESS;
  readonly payload: IUser;
}

export interface IGetAccessFailed {
  readonly type: typeof GET_ACCESS_FAILED;
}

const accessLoaded = ():IGetAccessLoaded => {
    return {
      type: GET_ACCESS_LOADED,
    };
  };

const accessSuccess = (user:IUser):IAccessSuccess => {
  return {
    type: GET_ACCESS_SUCCESS,
    payload: user,
  };
};

const accessFailed = ():IGetAccessFailed => {
  return {
    type: GET_ACCESS_FAILED,
  };
};
function checkUserAccessRequest(accessToken: string | undefined) {
  return fetch(checkAccessUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponce);
}

const fetchCheckAccess = () => {
  return (dispatch: AppDispatch) => {
    return checkUserAccessRequest(getCookie("accessToken"))
      .then((res) => {
        dispatch(accessSuccess(res.user));
      })
      .catch((error) => {
        if(error.message === "jwt expired" || "jwt malformed") {
            dispatch(refreshToken("refreshToken"));
        }
      })
      .finally(() => {
        dispatch(accessLoaded());
      })
  };
};

//обновление токена
const refreshToken = (refreshToken: string | undefined) => {
  return (dispatch: AppDispatch) => {
   return fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(fetchCheckAccess());
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(accessFailed());
      });
  };
};

//изменение данных пользователя
export interface IUpdateRequest {
  readonly type: typeof UPDATE_INFO_SUBMIT;
}

export interface IUpdateSuccess {
  readonly type: typeof UPDATE_INFO_SUCCESS;
  readonly payload: IUser;
}

export interface IUpdateFailed {
  readonly type: typeof UPDATE_INFO_FAILED;
}

const updateRequest = ():IUpdateRequest => {
  return {
    type: UPDATE_INFO_SUBMIT,
  };
};

const updateSuccess = (user: IUser):IUpdateSuccess => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: user,
  };
};

const updateFailed = ():IUpdateFailed => {
  return {
    type: UPDATE_INFO_FAILED,
  };
};

const fetchUpdateUserInfo = (userData:IChangeUserInfo) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateRequest());
    fetch(checkAccessUrl, {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + getCookie("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(updateSuccess(res.user));
        localStorage.getItem(res.user); //*
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          dispatch(refreshToken("refreshToken")).then(() => {
            fetch(checkAccessUrl, {
              method: "PATCH",
              headers: {
                authorization: "Bearer " + getCookie("accessToken"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then(checkResponce)
              .then((res) => {
                dispatch(updateSuccess(res.user));
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

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_SUBMIT;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: IUser;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

const logoutRequest = ():ILogoutRequest => {
  return {
    type: LOGOUT_SUBMIT,
  };
};

const logoutSuccess = (user:IUser):ILogoutSuccess => {
  return {
    type: LOGOUT_SUCCESS,
    payload: user,
  };
};

const logoutFailed = ():ILogoutFailed => {
  return {
    type: LOGOUT_FAILED,
  };
};

const fetchLogout = (refreshToken: string | undefined) => {
  return (dispatch: AppDispatch) => {
    fetch(logoutUrl, {
      method: "POST",
      headers: {
        authorization: "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(checkResponce)
      .then((res) => {
        dispatch(logoutSuccess(res.user));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(logoutFailed());
      })
      .finally(() => {
        dispatch(logoutRequest());
      })
  };
};

export type TUserAction =
| IForgotPasswordSetValue
| IForgotPasswordSubmitValue
| IForgotPasswordSuccessValue
| IForgotPasswordFailedValue
| ISetPasswordValue
| IPasswordSubmitValue
| IPasswordSuccessValue
| IPasswordFailedValue
| ISetRegisterValue
| IRegisterSubmit
| IRegisterSuccess
| IRegisterFailed
| ISetLoginValue
| ILoginSubmit
| ILoginSuccess
| ILoginFailed
| IGetAccessLoaded
| IAccessSuccess
| IGetAccessFailed
| IUpdateRequest
| IUpdateSuccess
| IUpdateFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
;

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
