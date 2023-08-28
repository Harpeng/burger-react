import { combineReducers } from "redux";
import  burgerIngredientsReducer from './burger-ingredients';
import  ingredientDetailsReducer  from './ingredient-details';
import { burgerConstructorReducer } from './burger-constructor';
import  orderDetailsReducer  from './order-details';
import { authReducer } from "./auth";
import socketReducer from "./socketReduce";
import socketProfileReducer from "./socketProfileReduce";
import orderReducer from "./order";

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