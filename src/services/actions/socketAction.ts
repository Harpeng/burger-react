import { WS_CONNECTION_CLOSE,WS_CONNECTION_START,  WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from "../constants";
import { IWsMessage } from "../type/data";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}

export type TWsAction =
| IWsConnectionStart
| IWsConnectionSuccess
| IWsConnectionError
| IWsConnectionClose
| IWsConnectionClosed
| IWsGetMessage
;

export const wsConnectionStart = (url:string):IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = ():IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (event:string):IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: event,
  };
};

export const wsConnectionClose = ():IWsConnectionClose => {
  return {
    type: WS_CONNECTION_CLOSE,
  };
};

export const wsConnectionClosed = ():IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message:IWsMessage):IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};