import React from 'react';
import styles from './burger-ingredient.module.css';
import PropTypes from "prop-types";
import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { useDispatch, useSelector } from 'react-redux';
  import { useDrag } from 'react-dnd'
  import { v4 as uuid } from "uuid";

  function BurgerIngredient({data, id, src, name, price, type, onClick, count}) {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'item',
      item: {id, src, name, price, type, count},
      collect: (monitor) => ({
          isDragging: monitor.isDragging()
      })
  })

  const burgerComponents = useSelector(state => state.burgerConstructorReducer);



  const myCount = React.useMemo(() => {
    if(type === 'bun') {
      return id === burgerComponents.bun?.id ? 2 : 0;
    } else {
      return burgerComponents.burgerConstructorItems.reduce((acc, item) => {
        if(item?.id === id) {
          return acc +1;
        } else {
          return acc
        }
      }, 0);
    }
  }, [burgerComponents.bun, burgerComponents.burgerConstructorItems, id, type])






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
         <Counter count={myCount} size="default" />
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