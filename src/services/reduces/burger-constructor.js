import { v4 as uuid } from "uuid";
import {
  ADD_ITEM,
  DELETE_ITEM,
  SORT_ITEM,
  ADD_FILLING,
  ADD_BUN,
  addItem
} from "../actions/burger-constructor.js";

export const initialState = {
  dataBurger: [],
  burgerConstructorItems: [],
  bun: null,
  overlay: false,
  count: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload.type,
        };
      }
      return {
        ...state,
        burgerConstructorItems: [
          ...state.burgerConstructorItems,
          action.payload,
        ],
      };
    case DELETE_ITEM: {
      return {
        ...state,
        burgerConstructorItems: state.burgerConstructorItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    case SORT_ITEM:
      return {
        ...state,
        burgerConstructorItems: action.payload,
      };
    // case CHANGE_ITEM: {
    //   const newArray = [...state.burgerConstructorItems];
    //   newArray.splice(action.dragIndex, 1);
    //   newArray.splice(action.hoverIndex, 0, action.dragItem);
    //   return { ...state, burgerConstructorItems: newArray };
    // }
    default: {
      return state;
    }
  }
};
