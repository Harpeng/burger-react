import React from 'react';
import styles from './burgerIngredient.module.css';
import PropTypes from "prop-types";
import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";

  function BurgerIngredient(data) {
    return (
      <li key={data._id} className={`${styles.burgerIngredient} mt-6 mb-10`}>
        <img src={data.src} alt={data.name} className={`${styles.image} mb-2`} />
        <div className={`${styles.description} mb-2`}>
          <p
            className={`${styles.price} mr-2 text text_type_main-medium`}
          >
            {data.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {data.name}
        </p>
          <Counter count={1} size="default" />
      </li>
    );
  }

  BurgerIngredient.propTypes = {
    dataCard: PropTypes.object
  };

  export default BurgerIngredient;