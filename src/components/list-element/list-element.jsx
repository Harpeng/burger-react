import React from "react";
import styles from "./list-element.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../images/bun.png";
import { useSelector, useDispatch } from "react-redux";
import OrderInformation from "../order-information/order-information";


function ListElement({ isFeedList, order }) {
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.dataBurger
  );

  const getOrderList = () => {
    const list = [];
    order.ingredients.forEach((id) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === id) {
          list.push(ingredient);
        }
      });
    });
    return list;
  };


  const orderStatus = () => {
    if (order.status === "done") {
      return "Выполнен";
    } else {
      return "Готовится";
    }
  };

  const orderPrice = getOrderList.reduce((count, item) => {
    return count + item.price;
  }, 0);

  const location = useLocation();


  return (
    <li className={styles.container}>
      <Link to="" className={styles.link}>
        <div className={styles.order__data}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <h3 className="text text_type_main-medium">
        {order.name}
        </h3>
        {isFeedList && (
            <p
              className={`text text_type_main-default ${
                order.status === "done" ? styles.status : undefined
              }`}
            >
              {orderStatus}
            </p>
          )}
        <div className={styles.block__ingredients}>
            <OrderInformation data={getOrderList} /> 
          <div className={styles.price}>
            <p className="text text_type_digits-default">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListElement;