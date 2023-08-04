import { v4 as uuid } from "uuid";
import {baseUrl} from '../../utils/utils.js';
import {checkResponce} from '../../utils/api.js';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEM = 'SORT_ITEM';
export const RESET_INGREDIENT = "RESET_INGREDIENT";



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


export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: {...item, uniqueId: uuid() },
    }
}

  
  export const deleteIngredient = (uniqueId) => ({
    type: DELETE_ITEM,
    payload: uniqueId,
  });