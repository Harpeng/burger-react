import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR 
  } from "../actions/order.js";
  
  const initialState = {
    order: [],
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
        };
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          orderSucces: true,
          orderRequest: false,
          order: action.order,
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