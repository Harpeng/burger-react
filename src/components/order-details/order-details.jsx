import React from "react";
import styles from "./order-details.module.css";
import readyIcon from "../../images/done.png";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Preloader from "../preloader/preloader.jsx";
import { getOrderDataRequest } from "../../services/actions/order-details";

export function OrderDetails({ orderNumber }) {
  const { orderRequest, orderError } = useSelector((store) => ({
    orderRequest: store.orderDetailsReducer.orderRequest,
    orderError: store.orderDetailsReducer.orderError,
  }));

  console.log(orderRequest);
  return (
    <>
      <div className={`${styles.orderBlock} pt-4 pr-25 pb-30 pl-25`}>
        {orderRequest ? (
          <Preloader orderRequest={orderRequest} />
        ) : orderError ? (
          <Preloader orderError={orderError} />
        ) : (
          <>
            <p className="text text_type_digits-large mb-8">{orderNumber}</p>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img src={readyIcon} alt="заказ готов" className={styles.img} />
            <p className="text text_type_main-small mb-2">
              Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </p>
          </>
        )}
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};
