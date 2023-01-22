import {CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL} from '../actions/ingredient-details.js';

const initialState = {
    item: null
  };

const ingredientDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_INGREDIENT_MODAL: {
            return {
                item: action.data
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                item: null,
            }
        }
        default: {
            return {
                state,
            }
        }
    }
}

export default ingredientDetailsReducer;
