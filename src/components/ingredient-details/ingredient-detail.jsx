import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { burgerPropTypes } from "../../utils/types.js";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../services/actions/burger-ingredient.js";

export function IngredientDetails({ item }) {
  // const dispatch = useDispatch();
  // const location = useLocation();

  // const ingredient = location.state?.ingredient;
  // const {dataBurger } = useSelector((store) => ({
  //   dataBurger: store.burgerIngredientsReducer.dataBurger,
  // }));
  // // ingredientDetailsReducer item
  // // burgerIngredientsReducer dataBurger
  // const { id } = useParams();
  // const [ingredientData, setIngredientData] = useState(ingredient);

  // React.useEffect(() => {
  //   if (ingredient) {
  //     setIngredientData(ingredient);
  //   } else if (dataBurger.length) {
  //     setIngredientData(dataBurger.find((item) => item.id === id));
  //   } else {
  //     dispatch(fetchItems());
  //   }
  // }, [dispatch, id, ingredient, dataBurger]);

  // const dataBurger = useSelector(
  //   (store) => store.burgerIngredientsReducer.dataBurger
  // );

  // const { id } = useParams();

  // const currentIngredient = dataBurger.find((item) => item.id === id);

  // const location = useLocation();

  return (
      <div className={`pl-25 pr-25 pb-15 ${styles.ingredientBlock}`}>
        <img src={item.image_large} alt={item.name} className={"mb-4"} />
        <h3 className={`${styles.name} text text_type_main-medium mb-8`}>
          {item.name}
        </h3>
        <ul className={styles.DataCards}>
          <li className={`${styles.card} mr-5`}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Калории,ккал
            </p>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive`}
            >
              {item.calories}
            </p>
          </li>
          <li className={`${styles.card} mr-5`}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Белки,г
            </p>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive`}
            >
              {item.proteins}
            </p>
          </li>
          <li className={`${styles.card} mr-5`}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Жиры,г
            </p>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive`}
            >
              {item.fat}
            </p>
          </li>
          <li className={`${styles.card}`}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы,г
            </p>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive`}
            >
              {item.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    );
}

// IngredientDetails.propTypes = {
//   item: burgerPropTypes.isRequired,
// };