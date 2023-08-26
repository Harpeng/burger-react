import React, {FC} from "react";
import styles from "./order-element.module.css";
import { IburgerInfo } from "../../services/type/data";

interface IOrderElement {
  ingredient: IburgerInfo;
  index: number;
  length: number;
  extraClass?: string;
  showCounter: boolean;
}

 const OrderElement:FC<IOrderElement> = ({
  ingredient,
  index,
  length,
  showCounter,
  extraClass
}) => {

  return (
    <li className={`${styles.element} ${extraClass}`} >
      <img
        className={styles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      {showCounter && (
        <p className={`text text_type_main-default ${styles.text}`}>{`+${
          length - 6
        }`}</p>
      )}
    </li>
  );
}

export default OrderElement;