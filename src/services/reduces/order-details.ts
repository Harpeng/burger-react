import {
  GET_ORDER_DATA_REQUEST,
  GET_ORDER_DATA_SUCCESS,
  GET_ORDER_DATA_ERROR,
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
  ORDER_ERROR,
  RESET_ORDER,
} from "../constants/index";
import {TCurrentOrderActions} from '../actions/order-details';

export interface IOrderDetailInitialState {
  servOrder: null | number;
  orderRequest: boolean;
  orderError: boolean;
  orderSucces: boolean;
  openModal: boolean;
}

const initialState:IOrderDetailInitialState = {
  servOrder: null,
  openModal: false,
  orderRequest: false,
  orderSucces: false,
  orderError: false,
};

const orderDetailsReducer = (state = initialState, action:TCurrentOrderActions) => {
  switch (action.type) {
    case GET_ORDER_DATA_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderSucces: true,
        orderRequest: false,
        servOrder: action.payload,
      };
    }
    case GET_ORDER_DATA_ERROR: {
      return {
        ...state,
        orderError: true,
        openModal: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        openModal: false,
        servOrder: null,
      };
    }
    case OPEN_ORDER_MODAL: {
        return {
          ...state,
          openModal: true,
        };
      }
      case ORDER_ERROR: {
        return {
          ...state,
          orderRequest: false,
          orderError: true,
        };
      }
      case RESET_ORDER: {
        return {
          ...state,
          servOrder: null,
        }
      }
    default: {
      return state;
    }
  }
};

export default orderDetailsReducer;
