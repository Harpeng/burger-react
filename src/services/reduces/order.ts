import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../constants/index";
import {TOrderActions} from '../actions/order';
import { IOrder } from "../type/data";

export interface IOrderInitialState {
  order: null | string ;
  orderRequest: boolean;
  orderError: boolean;
  orderSucces: boolean;
}

const initialState:IOrderInitialState = {
  order: null,
  orderRequest: false,
  orderSucces: false,
  orderError: false,
};

const orderReducer = (state = initialState, action:TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        orderSucces: true,
        orderRequest: false,
        order: action.payload,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        order: null,
        ...state,
        orderError: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
