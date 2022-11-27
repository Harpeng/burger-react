import React from "react";
import styles from "./appHeader.module.css";
import logo from "../../images/headerLogo.svg";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__orderBar}>
            <li className={'pt-4 pr-5 pb-4 pl-5 mr-2'}>
                <a href="#" className={styles.header__link}>
                    <BurgerIcon type="primary"/>
                    <p className={`text text_type_main-default ml-2`}>Конструктор</p>
                </a>
            </li>
            <li className={'pt-4 pr-5 pb-4 pl-5'}>
                <a href="#" className={styles.header__link}>
                    <ListIcon type="secondary" />
                    <p className={`text text_type_main-default ml-2`}>Лента Заказов</p>
                </a>
            </li>
        </ul>
        <img src={logo} alt="логотип сайта" className={styles.header__logo}/>
        <ul className={styles.header__orderBar}>
            <li className={'pt-4 pr-5 pb-4 pl-5'}>
                <a href="#" className={styles.header__link}>
                    <ProfileIcon type="secondary" />
                    <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
                </a>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;