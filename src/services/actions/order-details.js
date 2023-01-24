const GET_ORDER_DATA_REQUEST = "GET_ORDER_DATA_REQUEST";
const GET_ORDER_DATA_SUCCESS = "GET_ORDER_DATA_SUCCESS";
const GET_ORDER_DATA_ERROR = "GET_ORDER_DATA_ERROR";
const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
const ORDER_ERROR = "ORDER_ERROR";

const getOrderDataRequest = () => {
  return {
    type: GET_ORDER_DATA_REQUEST,
  };
};

const getOrderDataSuccess = (data) => {
  return {
    type: GET_ORDER_DATA_SUCCESS,
    servOrder: data.order.number,
  };
};

const getOrderDataError = () => {
  return {
    type: GET_ORDER_DATA_ERROR,
  };
};

const closeOrderModal = () => {
    return {
        type: CLOSE_ORDER_MODAL,
      };
}

const openOrderModal = () => {
    return {
        type: OPEN_ORDER_MODAL,
      };
}

const orderError = () => {
    return {
        type: ORDER_ERROR,
      };
}


const openOrderDetails = (orderId) => {
    {
    return (dispatch) => { 
      dispatch(getOrderDataRequest());
      fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
          authorization: "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderId}),
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        )
        .then((data) => {
          dispatch(getOrderDataSuccess(data));
        })
        .catch((error) => {
          console.log(`Ошибка при загрузке данных: ${error}`);
          dispatch(getOrderDataError(error));
        });
    }
    };
  }

export {
    GET_ORDER_DATA_REQUEST,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_ERROR,
    CLOSE_ORDER_MODAL,
    OPEN_ORDER_MODAL,
    ORDER_ERROR,
    getOrderDataRequest,
    getOrderDataSuccess,
    getOrderDataError,
    closeOrderModal,
    openOrderDetails,
    openOrderModal,
    orderError
}

