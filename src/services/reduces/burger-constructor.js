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
          bun: action.payload,
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
          (item) => item._id !== action.payload
        ),
      };
    }
    case SORT_ITEM:
      return {
        ...state,
        burgerConstructorItems: action.payload,
      };
    default: {
      return state;
    }
  }
};
