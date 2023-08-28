import { v4 as uuid } from "uuid";
import {
  ADD_ITEM,
  DELETE_ITEM,
  SORT_ITEM,
  RESET_INGREDIENT,
} from "../constants/index";
import {TConstructorActions} from "../actions/burger-constructor";
import { IburgerInfo } from "../type/data";

export interface IConstructorState {
  burgerConstructorItems: Array<IburgerInfo>,
  bun: IburgerInfo | null,
  overlay: boolean,
  count: number,
};

export const initialState:IConstructorState = {
  burgerConstructorItems: [],
  bun: null,
  overlay: false,
  count: 0,
};

export const burgerConstructorReducer = (state = initialState, action:TConstructorActions):IConstructorState => {
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
          (item) => item.uniqueId !== action.payload
        ),
      };
    }
    case SORT_ITEM: 
      return {
        ...state,
        burgerConstructorItems: action.payload,
      };
    case RESET_INGREDIENT: {
      return {
        ...state,
        burgerConstructorItems: [],
        bun: null,
      }
    }  
    default: {
      return state;
    }
  }
};
