import { fetchCheckAccess } from "../actions/auth";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    let closing = false;
    let url = undefined;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (wsConnect.type === type) {
        url = payload;
        socket = new WebSocket(url);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          const { success, ...restParsedData } = parsedData;

          if (event.data.message) {
            dispatch(fetchCheckAccess());
          }

          if (
            restParsedData.message === "Invalid or missing token" ||
            restParsedData.message === "jwt expired"
          ) {
            dispatch({ type: onError, payload: restParsedData.message });
          } else {
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnect, payload: url });
            }, 10000);
          }

          dispatch({ type: wsDisconnect, payload: event });
        };

        if (wsDisconnect.type === type) {
          closing = true;
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
