import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import logo from "../../images/headerLogo.svg";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {

  const{pathname} = useLocation();

  const activeLink = "text_color_primary";
  const inactiveLink = "text_color_inactive";
  const styleLink = `${styles.header__link} + ''`;

  const changeActiveIcon = React.useCallback(
    (url:string) => {
      if (pathname === "/" && url === "/") {
        return "primary";
      } else if (pathname.includes(url) && url !== "/") {
        return "primary";
      } else {
        return "secondary";
      }
    },
    [pathname]
  ); 


  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__orderBar}>
          <li className={"pt-4 pr-5 pb-4 pl-5 mr-2"}>
            <NavLink to="/" className={({ isActive }) => styleLink + (isActive ? activeLink : inactiveLink)}>
              <BurgerIcon type={changeActiveIcon("/")} />
              <p className={`text text_type_main-default ml-2`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={"pt-4 pr-5 pb-4 pl-5"}>
          <NavLink to="/feed" className={({ isActive }) => styleLink + (isActive ? activeLink : inactiveLink)}>
              <ListIcon type={changeActiveIcon("/feed")} />
              <p className={`text text_type_main-default ml-2`}>
                Лента Заказов
              </p>
          </NavLink>
          </li>
        </ul>
        <img src={logo} alt="логотип сайта" className={styles.header__logo} />
        <ul className={styles.header__orderBar}>
          <li className={"pt-4 pr-5 pb-4 pl-5"}>
            <NavLink to="/profile" className={({ isActive }) => (styleLink + (isActive ? activeLink : inactiveLink))}>
              <ProfileIcon type={changeActiveIcon("/profile")} />
              <p className={`text text_type_main-default ml-2`}>
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
