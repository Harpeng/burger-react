import React from "react";
import styles from "./order-details.module.css";
import readyIcon from "../../images/done.png";
import PropTypes from "prop-types";

export function OrderDetails({orderNumber}) {
    return(
        <div className={`${styles.orderBlock} pt-4 pr-25 pb-30 pl-25`}>
            <p className="text text_type_digits-large mb-8">{orderNumber}</p>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img src={readyIcon} alt="заказ готов" className={styles.img}/>
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number,
  };