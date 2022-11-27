import React from 'react';
import styles from './burgerIngredientList.module.css';
import PropTypes from "prop-types";
import BurgerIngredient from '../burgerIngredient/burgerIngredient.jsx';

function BurgerIngredientList({ data, name }) {
    return (
      <section className={styles.burgerIngredientList}>
        <p className={`text text_type_main-medium mt-10 ${styles.title}`}>{name}</p>
        <ul className={`${styles.list}`}>
          {data?.map((item) => (
            <BurgerIngredient
              name={item.name}
              key={item._id}
              src={item.image}
              price={item.price}
            />
          ))}
        </ul>
      </section>
    );
  }
  BurgerIngredientList.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
  };

  export default BurgerIngredientList;