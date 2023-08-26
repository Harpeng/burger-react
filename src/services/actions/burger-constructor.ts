import { v4 as uuid } from "uuid";
import {ADD_ITEM, DELETE_ITEM, SORT_ITEM, RESET_INGREDIENT} from "../constants/index";
import { IburgerInfo } from '../type/data';

export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly payload: IburgerInfo;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly payload: IburgerInfo;
}

export interface ISortIngredients {
  readonly type: typeof SORT_ITEM;
  readonly payload: Array<IburgerInfo>;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENT;
}

export type TConstructorActions =
| IAddItem
| IDeleteItem
| ISortIngredients
| IResetIngredients;


export const addItem = (item:IburgerInfo):IAddItem => {
    return {
        type: ADD_ITEM,
        payload: {...item, uniqueId: uuid() },
    }
}

  
  export const deleteIngredient = (uniqueId: IburgerInfo):IDeleteItem => ({
    type: DELETE_ITEM,
    payload: uniqueId,
  });

  export const sortIngredients = (
    items: Array<IburgerInfo>
  ): ISortIngredients => {
    return {
      type: SORT_ITEM,
      payload: items,
    };
  };

  export const resetIngredients = ():IResetIngredients =>({
    type: RESET_INGREDIENT,
  })