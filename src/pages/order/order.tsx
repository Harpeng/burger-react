import React, {FC} from "react";
import styles from "./order.module.css";
import OrderInformation from "../../components/order-information/order-information";

const Order:FC = () => {
  return (
      <div className={styles.Order}>
        <OrderInformation />
      </div>
  );
}

export default Order;