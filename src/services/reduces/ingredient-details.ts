import {OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL} from "../constants/index";
import { IburgerInfo } from '../type/data';
import{TCurrentIngredientActions} from '../actions/ingredient-details'

export interface ICurrentIngredient {
    item: IburgerInfo | null;
}

const initialState:ICurrentIngredient  = {
    item: null
  };

const ingredientDetailsReducer = (state = initialState, action:TCurrentIngredientActions):ICurrentIngredient => {
    switch(action.type) {
        case OPEN_INGREDIENT_MODAL: {
            console.log(action.payload, "888")
            return {
                item: action.payload
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            console.log(null);
            return {
                item: null,
            }
        }
        default: {
            return state
        }
    }
}

export default ingredientDetailsReducer;
