import { getCookie } from "../../utils/cookie.js";
import {
  FORGOT_PASSWORD_SET_VALUE,
  FORGOT_PASSWORD_SUBMIT,
  FORGOT_PASSWORD_SUBMIT_SUCCESS,
  FORGOT_PASSWORD_SUBMIT_FAILED,
  RESET_PASSWORD_SET_VALUE,
  RESET_PASSWORD_SUBMIT,
  RESET_PASSWORD_SUBMIT_SUCCESS,
  RESET_PASSWORD_SUBMIT_FAILED,
  REGISTER_SET_VALUE,
  REGISTER_SUBMIT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SET_VALUE,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_ACCESS_SUCCESS,
  GET_ACCESS_FAILED,
  UPDATE_INFO_SUBMIT,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILED,
  GET_ACCESS_LOADED,
} from "../actions/auth.js";

export const initialState = {
  //авторизация
//   user: {
//     email: "",
//     name: "",
//   },

  user: null,

  loaded: false,

  dataUser: null,

  userAuth: false,

  //выход из аккаунта
  logoutSubmit: false,
  logoutFailed: false,

  //восстановление пароля
  forgotPasswordForm: {
    email: "",
  },
  forgotPasswordSubmit: false,
  forgotPasswordFailed: false,
  forgotEmailSent: false,

  //сброс пароля
  resetPasswordForm: {
    password: "",
    token: "",
  },

  resetPasswordSubmit: false,
  resetPasswordFailed: false,
  resetPasswordRequest: false,

  //регистрация
  registerForm: {
    email: "",
    password: "",
    name: "",
  },

  registerSubmit: false,
  registerFailed: false,

  //логин
  loginForm: {
    email: "",
    password: "",
  },

  loginSubmit: false,
  loginFailed: false,

  // изменение данных
  updateInfoSubmit: false,
  updateInfoFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SET_VALUE: // восстановление пароля
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          [action.field]: action.value,
        },
      };
    case FORGOT_PASSWORD_SUBMIT: {
      return {
        ...state,
        forgotPasswordSubmit: true,
      };
    }
    case FORGOT_PASSWORD_SUBMIT_SUCCESS:
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          email: "",
        },
        resetEmailSent: true,
      };
    case FORGOT_PASSWORD_SUBMIT_FAILED:
      return {
        ...state,
        forgotPasswordSubmit: false,
        forgotPasswordFailed: true,
      };
    case RESET_PASSWORD_SET_VALUE: // сброс пароля
      return {
        ...state,
        resetPasswordForm: {
          ...state.resetPasswordForm,
          [action.field]: action.value,
        },
      };
    case RESET_PASSWORD_SUBMIT:
      return {
        ...state,
        resetPasswordSubmit: true,
        resetPasswordRequest: true,
      };
    case RESET_PASSWORD_SUBMIT_SUCCESS:
      return {
        ...state,
        resetPasswordForm: {
          ...state.resetPasswordForm,
          password: "",
          token: "",
        },
        resetPasswordRequest: false,
      };
    case RESET_PASSWORD_SUBMIT_FAILED:
      return {
        ...state,
        resetPasswordSubmit: false,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    case REGISTER_SET_VALUE: // регистрация
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          [action.field]: action.value,
        },
      };
    case REGISTER_SUBMIT: {
      return {
        ...state,
        registerSubmit: true,
      };
    }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          name: "",
          email: "",
          password: "",
        },
        dataUtser: action.dataUser,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerSubmit: false,
        registerFailed: true,
      };
    case LOGIN_SET_VALUE:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.field]: action.value,
        },
      };
    case LOGIN_SUBMIT:
      return {
        ...state,
        loginSubmit: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          email: "",
          password: "",
        },
        user: {
          ...state.user,
          email: action.payload.email,
          name: action.payload.name,
        },
        dataUtser: action.dataUser,
        userAuth: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginSubmit: false,
        loginFailed: true,
        userAuth: false,
      };
    case LOGOUT_SUBMIT:
      return {
        ...state,
        logoutSubmit: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSubmit: false,
        logoutFailed: false,
        userAuth: false,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutFailed: true,
      };
    case GET_ACCESS_LOADED:
      return {
        ...state,
        loaded: true,
      };  
    case GET_ACCESS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
      };
    case GET_ACCESS_FAILED:
      return {
        ...state,
        userAuth: false,
      };
    case UPDATE_INFO_SUBMIT:
      return {
        ...state,
        updateInfoSubmit: true,
      };
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_INFO_FAILED:
      return {
        ...state,
        updateInfoSubmit: false,
        updateInfoFailed: true,
      };
    default: {
      return state;
    }
  }
};
