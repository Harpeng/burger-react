import React, {FC} from "react";
import { Reorder } from "framer-motion";
import { useDispatch } from "../../../services/hook";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-fillings.module.css";
import { deleteIngredient } from "../../../services/actions/burger-constructor";
import { IburgerInfo } from "../../../services/type/data";

interface IBurgerFillingItem {
  burgerConstructorItems: IburgerInfo;
}

const BurgerFillingItem:FC <IBurgerFillingItem> = ({ burgerConstructorItems }) => {
  const dispatch = useDispatch();

  const handleDelete = (uniqueId:IburgerInfo) => {
    dispatch(deleteIngredient(uniqueId));
  };

  return (
    <Reorder.Item
      whileDrag={{ scale: 0.9 }}
      value={burgerConstructorItems}
      className={style.item}
    >
      <div className={`${style.item}  mb-4 pr-2`}>
        <span className={`mr-2`}>
          <DragIcon type="primary" />
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


export default BurgerFillingItem;
