import styles from "./preloader.module.css";
import preloader from "../../images/rocket.png";
import PropTypes from "prop-types";

export default function Preloader({ orderRequest, orderError }) {
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

Preloader.propTypes = {
  orderRequest: PropTypes.bool,
  orderError: PropTypes.bool,
};
