import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientList from "./burgerIngredientList/burgerIngredientsList.jsx";
import {burgerPropTypes} from "../../utils/types.js";

function BurgerIngredients({data, openItem}) {
  const [current, setCurrent] = React.useState("one");
  const handleClick = (evt) => {
    setCurrent(evt);
  };

  const bun = data.filter((element) => element.type === "bun");
  const main = data.filter((element) => element.type === "main");
  const sauce = data.filter((element) => element.type === "sauce");

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={"text text_type_main-large mt-10 mb-5 ${styles.title }"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        <Tab value="one" active={current === "one"} onClick={handleClick}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientsBar}>
        <BurgerIngredientList name={"Булки"} data={bun} onClick={openItem} />
        <BurgerIngredientList name={"Соусы"} data={sauce} onClick={openItem} />
        <BurgerIngredientList name={"Начинки"} data={main} onClick={openItem} />
      </div>
    </section>
  );
}


BurgerIngredients.propTypes = {
    sauce: PropTypes.arrayOf(burgerPropTypes),
    main: PropTypes.arrayOf(burgerPropTypes),
    bun: PropTypes.arrayOf(burgerPropTypes),
    openItem: PropTypes.func,
  };

export default BurgerIngredients;
