import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-consist.module.css";
import OrderItem from "../order-item/order-item";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import useOrder from "../../hook/useOrder";
// import React from "react";
// import { fetchItems } from "../../services/actions/burger-ingredient";
// import { wsUrlAll, wsUrlProfile} from "../../utils/utils.js";
// import {
//     wsConnectionStart,
//     wsConnectionClose,
//   } from "../../services/actions/socketAction";


export default function OrderConsist() {

    const location = useLocation();
    const orders = useSelector((store) => store.socketReducer.orders);
    const { id } = useParams();
    const currentOrder = orders.find((item) => item._id === id);

    const { orderIngredientsList, orderPrice, orderStatus } =
    useOrder(currentOrder);
    

  function counter(ingredient) {
    let counter = 0;
    orderIngredientsList.forEach((item) => {
      if (item._id === ingredient._id) {
        counter += 1;
      }
    });
    return counter;
  }

  const IngredientList = Array.from(new Set(orderIngredientsList)); 
  
  console.log(currentOrder.ingredients)



  return (
    <div
      className={`${styles.container} ${
        styles.title ? undefined : styles.container__modal
      }`}
    >
      <div className={styles.container__title}>
        <p
          className={`text text_type_digits-default mb-10 ${styles.title}`}
        >{`#${currentOrder.number}`}</p>
        <p className="text text_type_main-medium mb-2">{`${currentOrder.name}`}</p>
        <p
          className={`text text_type_main-default ${styles.color}`}
        >{orderStatus}</p>
      </div>
      <div className={styles.container__item}>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={styles.list}>
          {IngredientList.map((item) => {
            return (
              <OrderItem
                key={item._id}
                counter={counter(item)}
                ingredient={item}
              />
            );
          })}
        </ul>
      </div>
      <div className={styles.container__date}>
        <FormattedDate
          date={new Date(currentOrder.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={styles.price}>
          <CurrencyIcon type="primary" />
          <p className="text text_type_digits-default">{orderPrice}</p>
        </div>
      </div>
    </div>
  );
}
