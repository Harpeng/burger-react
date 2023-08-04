import React from "react";
import styles from "./order.module.css";
import OrderInformation from "../../components/order-information/order-information";

function Order() {
  return (
      <div className={styles.Order}>
        <OrderInformation />
      </div>
  );
}

export default Order;