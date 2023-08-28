import {baseUrl, wsUrl} from '../../utils/utils';
import {checkResponce} from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from './auth.js';
import { AppDispatch } from '../type';
import { IburgerInfo } from '../type/data';

import {GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_ERROR, CLOSE_ORDER_MODAL, OPEN_ORDER_MODAL, ORDER_ERROR, RESET_ORDER } from "../constants/index";

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_DATA_REQUEST;
}

export interface IGetOrderErr {
  readonly type: typeof ORDER_ERROR;
  readonly errorText: string;
}

export interface IResetOrder{
  readonly type: typeof RESET_ORDER;
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_DATA_ERROR;
  readonly errorText: string;
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IOpenOrder {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_DATA_SUCCESS;
  readonly payload: number;
}

export type TCurrentOrderActions =
| IGetOrderRequest
| IGetOrderError
| ICloseOrder
| IGetOrderSuccess
| IOpenOrder
| IResetOrder
| IGetOrderErr
;




const getOrderDataRequest = ():IGetOrderRequest => {
  return {
    type: GET_ORDER_DATA_REQUEST,
  };
};


const getOrderDataError = (text: string):IGetOrderError => {
  return {
    type: GET_ORDER_DATA_ERROR,
    errorText: text,
  };
};

const closeOrderModal = ():ICloseOrder => {
    return {
        type: CLOSE_ORDER_MODAL,
      };
}

const getOrderDataSuccess = (data: any):IGetOrderSuccess => {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    payload: data.order.number,
  };
};


const openOrderModal = ():IOpenOrder => {
    return {
        type: OPEN_ORDER_MODAL,
      };
}

const orderError = (text: string):IGetOrderErr => {
    return {
        type: ORDER_ERROR,
        errorText: text,
      };
}

const resetOrder = ():IResetOrder => {
  return {
      type: RESET_ORDER,
    };
}


const openOrderDetails = (orderId: Array<string>) => {
    {
    return (dispatch: AppDispatch) => { 
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
        // .catch((err) => {
        //   if (err.message === "jwt expired" || "jwt malformed") {
        //     dispatch(refreshToken(getCookie("refreshToken")))
        //       .then(() => {
        //       fetch(`${baseUrl}/orders`, {
        //         method: "POST",
        //         headers: {
        //           authorization: 'Bearer ' + getCookie("accessToken"),
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ ingredients: orderId}),
        //       })
        //       .then((data) => {
        //         dispatch(getOrderDataSuccess(data));
        //       })
        //     })
        //   }
        // })
        .catch((error) => {
          dispatch(getOrderDataError(error));
        })
    }
    };
  }



export {
    getOrderDataRequest,
    getOrderDataSuccess,
    getOrderDataError,
    closeOrderModal,
    openOrderDetails,
    openOrderModal,
    orderError,
}

