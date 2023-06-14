import styles from './ingredient-details.module.css';
import {IngredientDetails} from "../components/ingredient-details/ingredient-detail.jsx";
import Constructor from './constructor';
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../services/actions/burger-ingredient.js";

const Ingredient = () => {
  const {dataBurger } = useSelector((store) => ({
    dataBurger: store.burgerIngredientsReducer.dataBurger,
  }));

  const { currentIngredient } = useSelector((store) => ({
    currentIngredient: store.ingredientDetailsReducer.item,
  }));


  const { id } = useParams();

  const item = dataBurger.find((item) => item._id === id);
  

  const location = useLocation();

  return location.state?.from === "/" ? (
    <Constructor />
  ) : (
    item &&
    <div className={`${styles.wrapper} pt-30`}>
      <IngredientDetails item={item} />
    </div>
  )
}

export default Ingredient;