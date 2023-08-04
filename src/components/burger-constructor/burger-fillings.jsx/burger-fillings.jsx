import React from "react";
import { Reorder } from "framer-motion";
import { burgerPropTypes } from "../../../utils/types.js";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-fillings.module.css";
import { deleteIngredient } from "../../../services/actions/burger-constructor.js";

function BurgerFillingItem({ burgerConstructorItems }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <Reorder.Item
      whileDrag={{ scale: 0.9 }}
      value={burgerConstructorItems}
      className={style.item}
    >
      <div className={`${style.item}  mb-4 pr-2`}>
        <span className={`mr-2`}>
          <DragIcon />
        </span>
        <ConstructorElement
          text={burgerConstructorItems.name}
          price={burgerConstructorItems.price}
          thumbnail={burgerConstructorItems.src}
          handleClose={() => {
            handleDelete(burgerConstructorItems.uniqueId);
          }}
        />
      </div>
    </Reorder.Item>
  );
}

BurgerFillingItem.propTypes = {
  burgerConstructorItems: burgerPropTypes,
};

export default BurgerFillingItem;
