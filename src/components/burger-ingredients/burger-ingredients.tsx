import React,{FC} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientList from "./burger-ingredient-list/burger-ingredients-list";
import { useDispatch, useSelector } from "../../services/hook";
import {
  openIngredientDetails,
} from "../../services/actions/ingredient-details";
import { useInView } from "react-intersection-observer";
import { IburgerInfo } from "../../services/type/data";
import { createSelector } from 'reselect'



const BurgerIngredients: FC =  () =>  {

  const dataBurger = useSelector(
    (store) => store.burgerIngredientsReducer.dataBurger
  ); //получение ингредиентов с сервера

  const dispatch = useDispatch();

  const bun =  dataBurger.filter((element: IburgerInfo) => element.type === "bun");
  const main = dataBurger.filter((element: IburgerInfo) => element.type === "main");
  const sauce = dataBurger.filter((element: IburgerInfo) => element.type === "sauce");

  const [bunRef, bunsInView] = useInView({
    threshold: 0,
  });
  const [sauceRef, saucesInView] = useInView({
    threshold: 0,
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (bunsInView) {
      setCurrent("bun");
    } else if (saucesInView) {
      console.log(saucesInView);
      setCurrent("sauce");
    } else if (mainInView) {
      setCurrent("main");
    }
  }, [bunsInView, saucesInView, mainInView]);


  const openItem = (item: IburgerInfo) => {
    dispatch(openIngredientDetails(item));
  };

  // const closePopup = (e) => {
  //   dispatch(closeIngredientDetails());
  //   navigate("/");
  // };

  const [current, setCurrent] = React.useState("bun");
  const handleClick = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) {
      return element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section className={styles.burgerIngredients}>
      <h1 className={"text text_type_main-large mt-10 mb-5 ${styles.title }"}>
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={handleClick}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleClick}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={handleClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientsBar}>
        <div id="bun" ref={bunRef}>
          <BurgerIngredientList name={"Булки"} data={bun} onClick={() => openItem} />
        </div>
        <div id="sauce" ref={sauceRef}>
          <BurgerIngredientList
            name={"Соусы"}
            data={sauce}
            onClick={() => openItem}
          />
        </div>
        <div id="main" ref={mainRef}>
          <BurgerIngredientList
            name={"Начинки"}
            data={main}
            onClick={() => openItem}
          />
        </div>
      </div>
    </section>
  );
}


export default BurgerIngredients;
