import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientList from "./burgerIngredientList/burgerIngredientsList.jsx";
import {dataBurgerPropTypes, bun, main, sauce} from "../../utils/data.jsx";

function BurgerIngredients({data}) {
  const [current, setCurrent] = React.useState("one");
  const handleClick = (evt) => {
    setCurrent(evt);
  };

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
        <BurgerIngredientList name={"Булки"} data={bun} />
        <BurgerIngredientList name={"Соусы"} data={sauce} />
        <BurgerIngredientList name={"Начинки"} data={main} />
      </div>
    </section>
  );
}


dataBurgerPropTypes.propTypes = {
    sauce: PropTypes.arrayOf(dataBurgerPropTypes).isRequired,
    main: PropTypes.arrayOf(dataBurgerPropTypes).isRequired,
    bun: PropTypes.arrayOf(dataBurgerPropTypes).isRequired,
  };

export default BurgerIngredients;
