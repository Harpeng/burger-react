import React, {FC} from "react";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { NavLink, useLocation } from "react-router-dom";
import { IburgerInfo } from "../../../services/type/data";

interface IBurgerIngredient {
  data: IburgerInfo;
  id: string;
  type: string;
  name: string;
  src: string;
  price: number;
  onClick: (value: string) => void;
}

const BurgerIngredient:FC <IBurgerIngredient> = ({ id, src, name, price, type, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id, src, name, price, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const burgerComponents = useSelector(
    (state: any) => state.burgerConstructorReducer
  );


  const location = useLocation();

  const myCount = React.useMemo(() => {
    if (type === "bun") {
      return id === burgerComponents.bun?.id ? 2 : 0;
    } else {
      return burgerComponents.burgerConstructorItems.reduce((acc: any, item: any) => {
        if (item?.id === id) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
    }
  }, [burgerComponents.bun, burgerComponents.burgerConstructorItems, id, type]);


  return (
    <NavLink
      key={id}
      to={`/ingredients/${id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li
        ref={dragRef}
        onClick={() => onClick}
        className={`${styles.burgerIngredient} mt-6 mb-10`}
      >
        <img src={src} alt={name} className={`${styles.image} mb-2`} />
        <div className={`${styles.description} mb-2`}>
          <p className={`${styles.price} mr-2 text text_type_main-medium`}>
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
        <Counter count={myCount} size="default" />
      </li>
    </NavLink>
  );
}


export default BurgerIngredient;
