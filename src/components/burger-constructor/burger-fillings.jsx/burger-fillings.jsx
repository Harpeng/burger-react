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
import { DELETE_ITEM } from "../../../services/actions/burger-constructor.js";

function BurgerFillingItem({burgerConstructorItems}) {
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch({ type: DELETE_ITEM, payload: burgerConstructorItems })
    }

    return (
        <Reorder.Item
          whileDrag={{ scale: 0.9 }}
          value={burgerConstructorItems}
          className={style.item}
        >
          <DragIcon />
          <ConstructorElement
            text={burgerConstructorItems.name}
            price={burgerConstructorItems.price}
            thumbnail={burgerConstructorItems.image}
            handleClose={() =>
                {deleteItem()}
            }
          />
        </Reorder.Item>
      );
    }
    
    BurgerFillingItem.propTypes = {
     burgerConstructorItems: PropTypes.arrayOf(burgerPropTypes),
    };

    export default BurgerFillingItem;