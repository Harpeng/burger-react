import React, {FC} from "react";
import OrderConsist from "../../components/order-consist/order-consist";
// import { wsUrlAll, wsUrlProfile } from "../../utils/utils.js";
import styles from "./order-inform.module.css";

const OrderInform:FC = () => {

  return (
      <div className={styles.container}>
        <OrderConsist />
      </div>
    )
}

export default OrderInform;
