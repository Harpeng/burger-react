import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE ,
  WS_GET_MESSAGE_PROFILE,
  } from "../constants/index";
  import {IOrder } from "../type/data";
  import {TWsActionProfile} from "../actions/socketActionProfile";

  export type TSocketProfileState = {
    wsConnected: boolean,
    orders: Array<IOrder>,
    errorState: boolean,
    errorMessage: null | string,
  } 
  
  const initialState:TSocketProfileState = {
    wsConnected: false,
    orders: [],
    errorState: false,
    errorMessage: null,
  };
  
  export default function socketProfileReducer(state = initialState, action:TWsActionProfile) {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS_PROFILE:
        return {
          ...state,
          wsConnected: true,        
        };
  
      case WS_CONNECTION_ERROR_PROFILE:
        return {
          ...state,
          wsConnected: false,
          errorState: true,
          errorMessage: action.payload,
        };
  
      case WS_CONNECTION_CLOSED_PROFILE:
        return {
          ...state,
          wsConnected: false,
          errorState: false,
          errorMessage: null,
        };
  
      case WS_GET_MESSAGE_PROFILE:
        return {
          ...state,
          orders: action.payload.orders,       
        };
  
      default:
        return state;
    }
  }