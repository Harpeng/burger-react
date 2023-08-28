import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SET_COUNT,
} from "../constants/index";
import { IburgerInfo } from "../type/data";
import { TIngredientsActions } from "../actions/burger-ingredient";

export type TIngredientsState = {
  isLoading: boolean,
  dataBurger: Array<IburgerInfo>,
  error: boolean,
}

const initialState: TIngredientsState  = {
  isLoading: false,
  dataBurger: [],
  error: false,
};

const burgerIngredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ITEMS_SUCCESS:
      console.log(action.dataBurger);
      return {
        ...state,
        isLoading: false,
        dataBurger: action.dataBurger.map((item) => {
          return { ...item, count: 0 };
        }),
      };
    case GET_ITEMS_ERROR:
      return {
        ...state,
        error: true,
        dataBurger: [],
      };
    case INCREMENT_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id
            ? { ...item, count: item.count + action.count }
            : item
        ),
      };
    }
    case DECREMENT_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id
            ? { ...item, count: item.count - action.count }
            : item
        ),
      };
    }
    case SET_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id ? { ...item, count: action.count } : item
        ),
      };
    }
    default:
      return state;
  }
};

export default burgerIngredientsReducer;
