import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../actions/order.js";

const initialState = {
  order: null,
  orderRequest: false,
  orderSucces: false,
  orderError: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        order: null,
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
