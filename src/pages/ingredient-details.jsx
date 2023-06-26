import styles from "./ingredient-details.module.css";
import { IngredientDetails } from "../components/ingredient-details/ingredient-detail.jsx";
import Constructor from "./constructor";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../services/actions/burger-ingredient.js";

const Ingredient = () => {
//   const { dataBurger } = useSelector((store) => ({
//     dataBurger: store.burgerIngredientsReducer.dataBurger,
//   }));



//   const { id } = useParams();

//   const currentIngredient = dataBurger.find((item) => item._id === id);
//   const { item } = useSelector((store) => store.ingredientDetailsReducer);

//   const location = useLocation();

  return (
        <div className={`${styles.wrapper} pt-30`}>
          <IngredientDetails />
        </div>
    )
};

export default Ingredient;
