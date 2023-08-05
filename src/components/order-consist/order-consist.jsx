import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-consist.module.css";
import OrderItem from "../order-item/order-item";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { fetchOrder } from "../../services/actions/order";
import React, {useCallback, useMemo} from "react";
// import { fetchItems } from "../../services/actions/burger-ingredient";
// import { wsUrlAll, wsUrlProfile} from "../../utils/utils.js";
// import {
//     wsConnectionStart,
//     wsConnectionClose,
//   } from "../../services/actions/socketAction";

export default function OrderConsist() {

  const { number } = useParams();
  const { id } = useParams();


  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.dataBurger
  );

  const order = useSelector((store) => {
    let order = store.socketReducer.orders.find(
      (item) => item.number === number
    );
    if (order) {
      return order;
    }

    order = store.socketProfileReducer.orders.find(
      (item) => item.number === number
    );
    if (order) {
      return order;
    }

    order = store.orderReducer.order;
    if (order) {
      return order;
    }

    return null;
  });

  console.log(order);


  React.useEffect(() => {
    if (order === null || order) {
      dispatch(fetchOrder(number));
    } 
  }, []);



  if (!order) {
    return null;
  }

  const getOrderList = () => {
    const list = [];
    order.ingredients?.forEach((ingredientId) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === ingredientId) {
          list.push(ingredient);
        }
      });
    });

    return list;
  };


  

  const orderList = getOrderList();


  const orderStatus = () => {
    if (order.status === "done") {
      return "Выполнен";
    } else {
      return "Готовится";
    }
  };

  const status = orderStatus();


  const orderPrice = orderList.reduce((price, item) => {
    return price + item.price;
  }, 0);


  const ingredientList = Array.from(new Set(orderList));

  function counter(ingredient) {
    let counter = 0;
    orderList.forEach((item) => {
      if (item._id === ingredient._id) {
        counter ++;
      }
    });
    return counter;
  }

  console.log(ingredientList)

  return (
    <div
      className={`${styles.container} ${
        styles.title ? undefined : styles.container__modal
      }`}
    >
      <div className={styles.container__title}>
        <p
          className={`text text_type_digits-default mb-10 ${styles.title}`}
        >{`#${order.number}`}</p>
        <p className="text text_type_main-medium mb-2">{`${order.name}`}</p>
        <p className={`text text_type_main-default ${styles.color}`}>
          {status}
        </p>
      </div>
      <div className={styles.container__item}>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={styles.list}>
          {ingredientList?.map((item) => {
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
          date={new Date(order.createdAt)}
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
