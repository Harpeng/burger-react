import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from './reduces/index.js';
import thunk from "redux-thunk";
import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from './actions/socketAction.js'
import {socketMiddleware} from "./middleware/socketMiddleWare.js";

const wsActions = {
  wsConnect: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_CONNECTION_CLOSED
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enchancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)))

const store = createStore(rootReducers, enchancer);

export default store;
