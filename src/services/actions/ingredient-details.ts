import {OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL} from "../constants/index"
import { IburgerInfo } from '../type/data';

export interface IOpenIngredient {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly payload: IburgerInfo;
}

export interface ICloseIngredient {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export type TCurrentIngredientActions =
| IOpenIngredient
| ICloseIngredient;

const openIngredientDetails = (item:IburgerInfo):IOpenIngredient => ({
  type: OPEN_INGREDIENT_MODAL,
  payload: item,
});

const closeIngredientDetails = ():ICloseIngredient => ({
  type: CLOSE_INGREDIENT_MODAL,
});

export {CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL, openIngredientDetails, closeIngredientDetails};