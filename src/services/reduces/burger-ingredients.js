import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  SET_COUNT,
} from "../actions/burger-ingredient.js";

const initialState = {
  isLoading: false,
  dataBurger: [],
  error: "",
};

const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataBurger: action.dataBurger.map((item) => {
          return { ...item, qty: 0 };
        }),
      };
    case GET_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case INCREMENT_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty + action.count }
            : item
        ),
      };
    }
    case DECREMENT_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id
            ? { ...item, qty: item.count - action.count }
            : item
        ),
      };
    }
    case SET_COUNT: {
      return {
        ...state,
        dataBurger: [...state.dataBurger].map((item) =>
          item.id === action.id ? { ...item, qty: action.count } : item
        ),
      };
    }
    default:
      return state;
  }
};

export default burgerIngredientsReducer;
