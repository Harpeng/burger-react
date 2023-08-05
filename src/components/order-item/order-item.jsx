import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";

export default function OrderItem({ ingredient, counter }) { 

  console.log(counter)
    return (
      <li className={styles.container}>
        <div className={styles.container__item}>
          <div className={styles.container__image}>
            <img
              className={styles.image}
              src={ingredient.image_mobile}
              alt={ingredient.name}
            />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>
            {ingredient.name}
          </p>
        </div>
        <div className={styles.counter}>
          <p className="text text_type_digits-default">{`${counter} x ${ingredient.price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    );
  }