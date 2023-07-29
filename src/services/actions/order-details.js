import {baseUrl} from '../../utils/utils.js';
import {checkResponce} from '../../utils/api.js';
import { getCookie } from '../../utils/cookie.js';
import { refreshToken } from './auth.js';

const GET_ORDER_DATA_REQUEST = "GET_ORDER_DATA_REQUEST";
const GET_ORDER_DATA_SUCCESS = "GET_ORDER_DATA_SUCCESS";
const GET_ORDER_DATA_ERROR = "GET_ORDER_DATA_ERROR";
const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
const ORDER_ERROR = "ORDER_ERROR";
const RESET_ORDER = "RESET_ORDER";



const getOrderDataRequest = () => {
  return {
    type: GET_ORDER_DATA_REQUEST,
  };
};


const getOrderDataError = () => {
  return {
    type: GET_ORDER_DATA_ERROR,
  };
};

const closeOrderModal = () => {
    return {
        type: CLOSE_ORDER_MODAL,
      };
}

const getOrderDataSuccess = (data) => {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    payload: data.order.number,
  };
};

const getOrderSuccess = (data) => {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    payload: data.order,
  };
};

const openOrderModal = () => {
    return {
        type: OPEN_ORDER_MODAL,
      };
}

const orderError = () => {
    return {
        type: ORDER_ERROR,
      };
}


const openOrderDetails = (orderId) => {
    {
    return (dispatch) => { 
      dispatch(openOrderModal());
      dispatch(getOrderDataRequest());
      fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          authorization: 'Bearer ' + getCookie("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderId}),
      })
      .then(checkResponce)
        .then((data) => {
          dispatch(getOrderDataSuccess(data));
        })
        .catch((err) => {
          if (err.message === "jwt expired" || "jwt malformed") {
            dispatch(refreshToken(getCookie("refreshToken")))
            .then(() => {
              fetch(`${baseUrl}/orders`, {
                method: "POST",
                headers: {
                  authorization: 'Bearer ' + getCookie("accessToken"),
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ingredients: orderId}),
              })
              .then((data) => {
                dispatch(getOrderDataSuccess(data));
              })
            })
          }
        })
        .catch((error) => {
          dispatch(getOrderDataError(error));
        })
    }
    };
  }

  const fetchOrder = (number) => {
    return (dispatch) => {
      dispatch(getOrderDataRequest);
      fetch(`${baseUrl}/orders/${number}`)
        .then(checkResponce)
        .then((data) => {
          dispatch(getOrderSuccess(data));
        })
        .catch((error) => {
          console.log(`Ошибка при загрузке данных: ${error}`);
          dispatch(orderError(error));
        });
    };
  };



export {
    GET_ORDER_DATA_REQUEST,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_ERROR,
    CLOSE_ORDER_MODAL,
    OPEN_ORDER_MODAL,
    ORDER_ERROR,
    getOrderDataRequest,
    getOrderDataSuccess,
    getOrderDataError,
    closeOrderModal,
    openOrderDetails,
    openOrderModal,
    orderError,
    RESET_ORDER,
    fetchOrder
}

