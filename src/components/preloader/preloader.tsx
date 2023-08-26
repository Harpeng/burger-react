import React, {FC} from "react";
import styles from "./preloader.module.css";
import preloader from "../../images/rocket.png";

interface IPreloader {
  orderRequest?: boolean;
  orderError?: boolean;
}

 const Preloader:FC<IPreloader> = ({ orderRequest, orderError }) => {
  return (
    <>
      {orderRequest && (
        <>
          <img src={preloader} alt="загрузка" className={styles.loader} />
          <p className={`text text_type_main-medium ${styles.text__loader}`}>
            Запускаем заказ...подождите
          </p>
        </>
      )}
      {orderError && (
        <p className={`text text_type_main-large ${styles.text}`}>
          Ошибка загрузки данных
        </p>
      )}
    </>
  );
}

export default Preloader;
