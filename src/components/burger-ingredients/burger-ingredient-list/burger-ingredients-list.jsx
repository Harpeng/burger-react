import React from 'react';
import styles from './burger-ingredient-list.module.css';
import PropTypes from "prop-types";
import BurgerIngredient from '../burger-ingredient/burger-ingredient.jsx';
import {burgerPropTypes} from '../../../utils/types.js';

function BurgerIngredientList({ data, name, onClick}) {

    return (
      <section className={styles.burgerIngredientList}>
        <p className={`text text_type_main-medium mt-10 ${styles.title}`}>{name}</p>
        <ul className={`${styles.list}`}>
          {data.map((item) => (
            <BurgerIngredient
              name={item.name}
              key={item._id}
              src={item.image}
              price={item.price}
              onClick={() => onClick(item)}
            />
          ))}
        </ul>
      </section>
    );
  }
  BurgerIngredientList.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes),
    name: PropTypes.string,
    onClick: PropTypes.func,
  };

  export default BurgerIngredientList;