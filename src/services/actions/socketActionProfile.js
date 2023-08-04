export const WS_CONNECTION_START_PROFILE = "WS_CONNECTION_START_PROFILE";
export const WS_CONNECTION_SUCCESS_PROFILE = "WS_CONNECTION_SUCCESS_PROFILE";
export const WS_CONNECTION_ERROR_PROFILE = "WS_CONNECTION_ERROR_PROFILE";
export const WS_CONNECTION_CLOSE_PROFILE = "WS_CONNECTION_CLOSE_PROFILE";
export const WS_CONNECTION_CLOSED_PROFILE = "WS_CONNECTION_CLOSED_PROFILE";
export const WS_GET_MESSAGE_PROFILE = "WS_GET_MESSAGE_PROFULE";

export const wsConnectionStartProfile = (url) => {
  return {
    type: WS_CONNECTION_START_PROFILE,
    payload: url,
  };
};

export const wsConnectionSuccessProfile = () => {
  return {
    type: WS_CONNECTION_SUCCESS_PROFILE,
  };
};

export const wsConnectionErrorProfile = (event) => {
  return {
    type: WS_CONNECTION_ERROR_PROFILE,
    payload: event,
  };
};

export const wsConnectionCloseProfile = () => {
  return {
    type: WS_CONNECTION_CLOSE_PROFILE
  };
};

export const wsConnectionClosedProfile = () => {
  return {
    type: WS_CONNECTION_CLOSED_PROFILE,
  };
};

export const wsGetMessageProfile = (message) => {
  return {
    type: WS_GET_MESSAGE_PROFILE,
    payload: message,
  };
};