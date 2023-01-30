import { v4 as uuid } from "uuid";
import {ADD_ITEM, DELETE_ITEM, SORT_ITEM} from '../actions/burger-constructor.js'

export const initialState = {
  dataBurger: [],
  burgerConstructorItems: [],
  bun: {},
  overlay: false,
  count: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.item.payload.type === "bun") {
        if (action.item.payload.count < 1) {
          return {
            ...state,
            bun: action.item.payload,
            dataBurger: [...state.dataBurger].map((item) => {
              if (item.type === "bun" && item._id === action.item.payload.id) {
                return { ...item, count: ++item.count };
              } else if (item.type === "bun") {
                return { ...item, count: 0 };
              } else {
                return { ...item };
              }
            }),
          };
        } else if (action.item.payload.count >= 1) {
          return { ...state };
        }
      } else if (action.item.payload.type != "bun") {
        console.log(state.burgerConstructorItems);
        return {
          ...state,
          burgerConstructorItems: [
            ...state.burgerConstructorItems,
            action.item.payload,
          ],
          dataBurger: [...state.dataBurger].map((item) => {
            if (item.type != "bun" && item._id === action.item.payload.id) {
              return { ...item, count: ++item.count };
            } else {
              return { ...item };
            }
          }),
        };
      } else {
        return { ...state, bun: action.item };
      }
      return {
        ...state,
        burgerConstructorItems: [
          ...state.burgerConstructorItems,
          action.item.payload,
        ],
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        burgerConstructorItems: state.burgerConstructorItems.filter(
          (item) => item._id !== action.payload._id
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

