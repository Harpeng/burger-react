import React, {FC} from "react";
import styles from "./list-element.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hook";
import OrderInformation from "../order-information/order-information";
import { IOrder, IburgerInfo} from "../../services/type/data";

interface IListElement {
  isOrder: boolean;
  order: IOrder;
}

const ListElement:FC<IListElement> = ({ isOrder, order }) => {


  const dispatch = useDispatch();
    
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.dataBurger
  );

  const getOrderList = () => {
    const list:Array<IburgerInfo> = [];
    order.ingredients.forEach((id) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === id) {
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

  const getOrderStatus = orderStatus();

  const orderPrice = orderList.reduce((price, item) => {
    return price + item.price;
  }, 0);

  const location = useLocation();


  return (
    <li className={styles.container}>
      <Link
        to={`${order.number}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.order__data}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <h3 className="text text_type_main-medium">{order.name}</h3>
        {isOrder && (
          <p
            className={`text text_type_main-default ${
              order.status === "done" ? styles.status : undefined
            }`}
          >
            {getOrderStatus}
          </p>
        )}
        <div className={styles.block__ingredients}>
          <OrderInformation data={orderList} />
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
