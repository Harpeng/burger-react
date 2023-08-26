import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from './reduces/index';
import thunk from "redux-thunk";
import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from './constants/index';
import{WS_CONNECTION_START_PROFILE, WS_CONNECTION_SUCCESS_PROFILE, WS_CONNECTION_ERROR_PROFILE, WS_CONNECTION_CLOSE_PROFILE, WS_CONNECTION_CLOSED_PROFILE, WS_GET_MESSAGE_PROFILE} from "./constants/index";
import {socketMiddleware} from "./middleware/socketMiddleWare";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClosed: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_CONNECTION_CLOSED
};

const wsActionsProfile = {
  wsInit: WS_CONNECTION_START_PROFILE,
  onOpen: WS_CONNECTION_SUCCESS_PROFILE,
  onClosed: WS_CONNECTION_CLOSE_PROFILE,
  onError: WS_CONNECTION_ERROR_PROFILE,
  onMessage: WS_GET_MESSAGE_PROFILE,
  wsDisconnect:WS_CONNECTION_CLOSED_PROFILE,
};

const enchancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions), socketMiddleware(wsActionsProfile)))

const store = createStore(rootReducers, enchancer);

export default store;
