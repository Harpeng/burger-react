import React from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientList from "./burger-ingredient-list/burger-ingredients-list.jsx";
import {burgerPropTypes} from "../../utils/types.js";
import { DataContext, HandlerContext} from "../../utils/context.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from "../../services/actions/burger-ingredient";
import {Modal} from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-detail";
import {openIngredientDetails, closeIngredientDetails} from "../../services/actions/ingredient-details.js";
import { useInView } from 'react-intersection-observer';

function BurgerIngredients() {
  const dataBurger = useSelector((store) => store.burgerIngredientsReducer.dataBurger); //получение ингредиентов с сервера
  const { item } = useSelector(store => store.ingredientDetailsReducer);


  const dispatch = useDispatch();

    const openItem = (item) => {
      dispatch(openIngredientDetails(item));
    }


  const closePopup = (e) => {
    dispatch(closeIngredientDetails());
  };


  const bun = dataBurger.filter((element) => element.type === "bun");
  const main = dataBurger.filter((element) => element.type === "main");
  const sauce = dataBurger.filter((element) => element.type === "sauce");



  
  
  const [bunRef, bunsInView] = useInView({
    threshold: 0,
});
  const [sauceRef, saucesInView] = useInView({
    threshold: 0,
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0,
  });

  const [current, setCurrent] = React.useState("bun");
  const handleClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) {
      return (element.scrollIntoView({ behavior: "smooth" }),
      console.log(element, 'леша-пися')
      )
    }
  }

  React.useEffect(() => {
    if (bunsInView) {
      setCurrent("bun")
    } else if (saucesInView) {
      console.log(saucesInView,'катя-пися')
      setCurrent("sauce")
    } else if (mainInView) {
      setCurrent("main")
    }
  }, [bunsInView, saucesInView, mainInView]);

  React.useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch])

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={"text text_type_main-large mt-10 mb-5 ${styles.title }"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        <Tab id="tab" value="bun" active={current === "bun"} onClick={handleClick}>
          Булки
        </Tab>
        <Tab id="tab" value="sauce" active={current === "sauce"} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab id="tab" value="main" active={current === "main"} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientsBar}>
        <div id="bun" ref={bunRef}>
        <BurgerIngredientList  name={"Булки"} data={bun} onClick={openItem} />
        </div>
        <div id="sauce" ref={sauceRef}>
        <BurgerIngredientList name={"Соусы"} data={sauce} onClick={openItem} />
        </div>
        <div id="main" ref={mainRef}>
        <BurgerIngredientList name={"Начинки"} data={main} onClick={openItem} />
        </div>
      </div>
      {item && (
          <Modal closePopup={closePopup} title="Детали ингредиента">
            <IngredientDetails item={item} />
          </Modal>
      )}
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
