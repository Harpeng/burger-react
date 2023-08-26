import React, {FC} from "react";
import styles from "./burger-ingredient-list.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { IburgerInfo } from "../../../services/type/data";

interface IBurgerIngredientsList {
  data: Array<IburgerInfo>;
  name: string;
  onClick: (value: string) => void;
}

const  BurgerIngredientList:FC <IBurgerIngredientsList> = ({ data, name, onClick }) => {
  return (
    <section className={styles.burgerIngredientList}>
      <p className={`text text_type_main-medium mt-10 ${styles.title}`}>
        {name}
      </p>
      <ul className={`${styles.list}`}>
        {data.map((item, index) => (
          <BurgerIngredient
            data={item}
            id={item._id}
            type={item.type}
            name={item.name}
            key={index}
            src={item.image}
            price={item.price}
            onClick={(item) => onClick(item)}
          />
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredientList;
