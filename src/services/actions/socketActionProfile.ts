import {WS_CONNECTION_START_PROFILE, WS_CONNECTION_SUCCESS_PROFILE, WS_CONNECTION_ERROR_PROFILE, WS_CONNECTION_CLOSE_PROFILE, WS_CONNECTION_CLOSED_PROFILE, WS_GET_MESSAGE_PROFILE} from "../constants";
import { IWsMessageProfile } from "../type/data";

export interface IWsConnectionStartProfile {
  readonly type: typeof WS_CONNECTION_START_PROFILE;
  readonly payload: string;
}

export interface IWsConnectionSuccessProfile {
  readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE;
}

export interface IWsConnectionErrorProfile {
  readonly type: typeof WS_CONNECTION_ERROR_PROFILE;
  readonly payload: string;
}

export interface IWsConnectionCloseProfile {
  readonly type: typeof WS_CONNECTION_CLOSE_PROFILE;
}

export interface IWsConnectionClosedProfile {
  readonly type: typeof WS_CONNECTION_CLOSED_PROFILE;
}

export interface IWsGetMessageProfile {
  readonly type: typeof WS_GET_MESSAGE_PROFILE;
  readonly payload: IWsMessageProfile;
}

export type TWsActionProfile =
| IWsConnectionStartProfile
| IWsConnectionSuccessProfile
| IWsConnectionErrorProfile
| IWsConnectionCloseProfile
| IWsConnectionClosedProfile
| IWsGetMessageProfile
;

export const wsConnectionStartProfile = (url:string):IWsConnectionStartProfile => {
  return {
    type: WS_CONNECTION_START_PROFILE,
    payload: url,
  };
};

export const wsConnectionSuccessProfile = ():IWsConnectionSuccessProfile => {
  return {
    type: WS_CONNECTION_SUCCESS_PROFILE,
  };
};

export const wsConnectionErrorProfile = (event:string):IWsConnectionErrorProfile => {
  return {
    type: WS_CONNECTION_ERROR_PROFILE,
    payload: event,
  };
};

export const wsConnectionCloseProfile = ():IWsConnectionCloseProfile => {
  return {
    type: WS_CONNECTION_CLOSE_PROFILE
  };
};

export const wsConnectionClosedProfile = ():IWsConnectionClosedProfile => {
  return {
    type: WS_CONNECTION_CLOSED_PROFILE,
  };
};

export const wsGetMessageProfile = (message:IWsMessageProfile):IWsGetMessageProfile => {
  return {
    type: WS_GET_MESSAGE_PROFILE,
    payload: message,
  };
};