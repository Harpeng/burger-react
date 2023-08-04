import { combineReducers } from "redux";
import  burgerIngredientsReducer from './burger-ingredients.js';
import  ingredientDetailsReducer  from './ingredient-details.js';
import { burgerConstructorReducer } from './burger-constructor.js';
import  orderDetailsReducer  from './order-details.js';
import { authReducer } from "./auth.js";
import socketReducer from "./socketReduce.js";
import socketProfileReducer from "./socketProfileReduce";
import orderReducer from "./order.js";

const rootReducers = combineReducers({
    burgerIngredientsReducer,
    ingredientDetailsReducer,
    burgerConstructorReducer,
    orderDetailsReducer,
    authReducer,
    socketReducer,
    socketProfileReducer, 
    orderReducer
})

export default rootReducers;