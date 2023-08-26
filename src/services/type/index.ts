import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TIngredientsActions } from '../actions/burger-ingredient.js';
import{TCurrentIngredientActions} from '../actions/ingredient-details';
import {TConstructorActions} from '../actions/burger-constructor';
import {TCurrentOrderActions} from "../actions/order-details";
import { TUserAction } from '../actions/auth.js';
import { TWsAction } from '../actions/socketAction.js';
import { TWsActionProfile } from '../actions/socketActionProfile.js';
import { TOrderActions } from '../actions/order.js';

import  store  from '../index';


type TApplicationActions =
     | TIngredientsActions
     | TCurrentIngredientActions
     | TConstructorActions
     | TCurrentOrderActions
     | TUserAction
     | TWsAction
     | TWsActionProfile
     | TOrderActions
;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;



