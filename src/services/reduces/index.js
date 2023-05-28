import { combineReducers } from "redux";
import  burgerIngredientsReducer from './burger-ingredients.js';
import  ingredientDetailsReducer  from './ingredient-details.js';
import { burgerConstructorReducer } from './burger-constructor.js';
import  orderDetailsReducer  from './order-details.js';
import { authReducer } from "./auth.js";

const rootReducers = combineReducers({
    burgerIngredientsReducer,
    ingredientDetailsReducer,
    burgerConstructorReducer,
    orderDetailsReducer,
    authReducer
})

export default rootReducers;