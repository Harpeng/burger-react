import React from 'react';
import styles from './burger-ingredient.module.css';
import PropTypes from "prop-types";
import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { useDispatch, useSelector } from 'react-redux';
  import { useDrag } from 'react-dnd'

  function BurgerIngredient({id, src, name, price, onClick}) {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'item',
      item: {id, src, name, price, onClick},
      collect: (monitor) => ({
          isDragging: monitor.isDragging()
      })
  })
  const getIngredientsCount = (store) => store.burgerIngredientsReducer.dataBurger.find(item => item._id === id).count;  
  const counts = useSelector(getIngredientsCount);

  return (
      <li ref={dragRef} onClick={onClick} className={`${styles.burgerIngredient} mt-6 mb-10`}>
        <img src={src} alt={name} className={`${styles.image} mb-2`} />
        <div className={`${styles.description} mb-2`}>
          <p
            className={`${styles.price} mr-2 text text_type_main-medium`}
          >
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {name}
        </p>
          <Counter count={counts} size="default" />
      </li>
    );
  }

  BurgerIngredient.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    src: PropTypes.any,
    onClick: PropTypes.func,
  };

  export default BurgerIngredient;