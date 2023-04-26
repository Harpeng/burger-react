import {baseUrl} from '../../utils/utils.js';
import {checkResponce} from '../../utils/api.js';

const GET_ITEMS_REQUEST = "GET_ITEM_REQUEST";
const GET_ITEMS_SUCCESS = "GET_ITEM_SUCCESS";
const GET_ITEMS_ERROR = "GET_ITEM_ERROR";
const INCREMENT_COUNT = "INCREASE_COUNT";
const DECREMENT_COUNT = "DECREASE_COUNT";
const SET_COUNT = "SET_COUNT";

const getItemsRequest = () => {
  return {
    type: GET_ITEMS_REQUEST,
  };
};

const getItemsSuccess = (data) => {
  return {
    type: GET_ITEMS_SUCCESS,
    dataBurger: data.data,
  };
};

const getItemsError = (error) => {
  return {
    type: GET_ITEMS_ERROR,
    payload: error,
  };
};


const fetchItems = () => {
  return (dispatch) => {
    dispatch(getItemsRequest);
    fetch(`${baseUrl}/ingredients`)
      .then(checkResponce)
      .then((data) => {
        dispatch(getItemsSuccess(data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(getItemsError(error));
      });
  };
};

const incrementCount = (id, count) => ({
  type: INCREMENT_COUNT,
  id: id,
  count: count,
});

const decreaseCount = (id, count) => ({
  type: DECREMENT_COUNT,
  id: id,
  count: count,
});

const setCount = (id, count) => ({
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
