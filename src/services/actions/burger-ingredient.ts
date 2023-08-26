import {baseUrl} from '../../utils/utils';
import {checkResponce} from '../../utils/api';
import {GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR, INCREMENT_COUNT, DECREMENT_COUNT, SET_COUNT} from "../constants/index";
import { IburgerInfo } from '../type/data';
import { AppDispatch } from '../type';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly dataBurger: Array<IburgerInfo>;
}

export interface IGetItemsError {
  readonly type: typeof GET_ITEMS_ERROR;
  readonly payload: string;
}

export interface IIncrementCount {
  readonly type: typeof INCREMENT_COUNT;
  readonly id: string;
  readonly count: number; 
}

export interface IDecrementCount {
  readonly type: typeof DECREMENT_COUNT;
  readonly id: string;
  readonly count: number; 
}

export interface ISetCount {
  readonly type: typeof SET_COUNT;
  readonly id: string;
  readonly count: number; 
}

export type TIngredientsActions =
| IGetItemsRequest
| IGetItemsSuccess
| IGetItemsError
| IIncrementCount
| IDecrementCount
| ISetCount;


const getItemsRequest = ():IGetItemsRequest => {
  return {
    type: GET_ITEMS_REQUEST,
  };
};

const getItemsSuccess = (data: Array<IburgerInfo>): IGetItemsSuccess => {
  return {
    type: GET_ITEMS_SUCCESS,
    dataBurger: data,
  };
};

const getItemsError = (error: string):IGetItemsError => {
  return {
    type: GET_ITEMS_ERROR,
    payload: error,
  };
};


const fetchItems = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getItemsRequest);
    fetch(`${baseUrl}/ingredients`)
      .then(checkResponce)
      .then((data) => {
        console.log(data)
        dispatch(getItemsSuccess(data.data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(getItemsError(error));
      });
  };
};

const incrementCount = (id: string, count: number): IIncrementCount => ({
  type: INCREMENT_COUNT,
  id: id,
  count: count,
});

const decreaseCount = (id: string, count: number): IDecrementCount => ({
  type: DECREMENT_COUNT,
  id: id,
  count: count,
});

const setCount = (id: string, count: number): ISetCount => ({
  type: SET_COUNT,
  id: id,
  count: count,
});

export {
  incrementCount,
  decreaseCount,
  setCount,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SET_COUNT,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  getItemsRequest,
  getItemsSuccess,
  getItemsError,
  fetchItems,
};
