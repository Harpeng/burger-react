import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";
import {
    Button
  } from "@ya.praktikum/react-developer-burger-ui-components";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text text_type_digits-large">404</p>
        <p className={`${styles.text} text text_type_main-medium`}>
          Похоже вы потерялись в галактике
        </p>
        <Link to="/" className={styles.link}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Вернуться на орбиту
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
