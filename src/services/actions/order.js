import {baseUrl, wsUrl} from '../../utils/utils.js';
import {checkResponce} from '../../utils/api.js';

const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
const GET_ORDER_ERROR = "GET_ORDER_ERROR";

const getOrderDataRequest = () => {
    return {
      type: GET_ORDER_REQUEST,
    };
  };

  const getOrderSuccess = (data) => {
    return {
      type: GET_ORDER_SUCCESS,
      payload: data.order,
    };
  };

  const orderError = () => {
    return {
        type: GET_ORDER_ERROR,
      };
}



const fetchOrder = () => {
    return (dispatch) => {
      dispatch(getOrderDataRequest);
      fetch(`${wsUrl}`)
        .then(checkResponce)
        .then((data) => {
          dispatch(getOrderSuccess(data));
        })
        .catch((error) => {
          console.log(`Ошибка при загрузке данных: ${error}`);
          dispatch(orderError(error));
        });
    };
  };

  export {fetchOrder, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR }