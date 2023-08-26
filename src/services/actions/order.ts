import {orderUrl } from "../../utils/utils";
import { checkResponce } from "../../utils/api";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from "../constants";
import { AppDispatch } from '../type';
import { IOrder } from "../type/data";

export interface IGetOrderDataRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderDataError {
  readonly type: typeof GET_ORDER_ERROR;
  readonly errorText: string;
}

export interface IGetOrderDataSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: number;
}

export type TOrderActions =
| IGetOrderDataRequest
| IGetOrderDataError
| IGetOrderDataSuccess
;


const getOrderDataRequest = ():IGetOrderDataRequest => {
  return {
    type: GET_ORDER_REQUEST,
  };
};

const getOrderSuccess = (data:any):IGetOrderDataSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: data.orders[0],
  };
};

const orderError = (text:string):IGetOrderDataError => {
  return {
    type: GET_ORDER_ERROR,
    errorText: text,
  };
};

const fetchOrder = (number:number) => {
  return (dispatch:AppDispatch) => {
    dispatch(getOrderDataRequest);
    console.log("88888");
    fetch(`${orderUrl}/${number}`)
      .then(checkResponce)
      .then((data) => {
        console.log(data);
        dispatch(getOrderSuccess(data));
        console.log(getOrderSuccess(data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(orderError(error));
      });
  };
};

export { fetchOrder, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR };
