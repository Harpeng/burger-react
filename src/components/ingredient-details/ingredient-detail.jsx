import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import {burgerPropTypes} from "../../utils/types.js"

export function IngredientDetails({item}) {
    return (
        <div className={`pl-25 pr-25 pb-15 ${styles.ingredientBlock}`}>
            <img src={item.image_large} alt={item.name} className={"mb-4"}/>
            <h3 className={`${styles.name} text text_type_main-medium mb-8`}>{item.name}</h3>
            <ul className={styles.DataCards}>
                <li className={`${styles.card} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{item.calories}</p>
                </li>
                <li className={`${styles.card} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Белки,г</p>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{item.proteins}</p>
                </li>
                <li className={`${styles.card} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Жиры,г</p>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{item.fat}</p>
                </li>
                <li className={`${styles.card}`}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Углеводы,г</p>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{item.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    item: burgerPropTypes.isRequired,
  };