import React from "react";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import data from "../../utils/data.jsx";
import { dataBurgerPropTypes, bun } from "../../utils/data.jsx";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  LockIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {
  return (
    <section className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 mb-4 ml-4 mr-4`}>
          {data?.map((item) => {
            if (item._id === "60666c42cc7b410027a1a9b1") {
              return (
                <li key={item._id} className={`${styles.item} ml-8`}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${item.name} (верх)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>
        <ul className={`${styles.list} ${styles.itemUnlock} ml-4 mr-4`}>
          {data?.map((item) => {
            if (item.type != "bun") {
              return (
                <li key={item._id} className={`${styles.item}  mb-4 pr-2`}>
                  <span className={`mr-2`}>
                    <DragIcon />
                  </span>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>
        <ul className={`${styles.list} mb-10`}>
          {data?.map((item) => {
            if (item._id === "60666c42cc7b410027a1a9b1") {
              return (
                <li key={item._id} className={`${styles.item}`}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${item.name} (низ)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={`${styles.order} mr-4 mb-10`}>
        <p className={`text text_type_digits-medium mr-3`}>610</p>
        <div className={`${styles.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataBurgerPropTypes).isRequired,
};

export default BurgerConstructor;
