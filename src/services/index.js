import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from './reduces/index.js';
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enchancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducers, enchancer);

export default store;
