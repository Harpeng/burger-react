import React from "react";
import { v4 as uuidv4 } from "uuid";
// import OrderIngredientsElement from "../order-ingredients-element/order-ingredients-element";
import styles from "./order-information.module.css";
import OrderElement from "../order-element/order-element";

function OrderInformation({ data }) {

  function showCounter() {
    if (data.length - 6 === 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <ul className={styles.list}>
      {data?.map((item, index) => {
        if (index < 5) {
          return (
            <OrderElement
              ingredient={item}
              index={index}
              key={index}
              length={data.length}
              showCounter={false}
            />
          );
        } else if (index === 5) {
          return (
            <OrderElement
              ingredient={item}
              index={index}
              key={index}
              length={data.length}
              showCounter={showCounter()}
              extraClass={styles.opacity}
            />
          );
        }
      })}
    </ul>
  );
}

export default OrderInformation;