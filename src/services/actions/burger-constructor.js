import { v4 as uuid } from "uuid";
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEM = 'SORT_ITEM';



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
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((data) => {
        dispatch(getItemsSuccess(data));
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
        dispatch(getItemsError(error));
      });
  };
};

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: {...item, _id: uuid() },
    }
}

  
  export const deleteIngredient = (id) => ({
    type: DELETE_ITEM,
    id: id,
  });