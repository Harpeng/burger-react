import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from './reduces/index.js';
import thunk from "redux-thunk";
import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from './actions/socketAction.js';
import{WS_CONNECTION_START_PROFILE, WS_CONNECTION_SUCCESS_PROFILE, WS_CONNECTION_ERROR_PROFILE, WS_CONNECTION_CLOSE_PROFILE, WS_CONNECTION_CLOSED_PROFILE, WS_GET_MESSAGE_PROFILE} from "../services/actions/socketActionProfile.js";
import {socketMiddleware} from "./middleware/socketMiddleWare.js";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_CONNECTION_CLOSED
};

const wsActionsProfile = {
  wsInit: WS_CONNECTION_START_PROFILE,
  onOpen: WS_CONNECTION_SUCCESS_PROFILE,
  onClose: WS_CONNECTION_CLOSE_PROFILE,
  onError: WS_CONNECTION_ERROR_PROFILE,
  onMessage: WS_GET_MESSAGE_PROFILE,
  wsDisconnect:WS_CONNECTION_CLOSED_PROFILE,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enchancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions), socketMiddleware(wsActionsProfile)))

const store = createStore(rootReducers, enchancer);

export default store;
