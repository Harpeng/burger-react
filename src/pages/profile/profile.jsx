import React from "react";
import { NavLink} from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { fetchLogout, fetchUpdateUserInfo } from "../../services/actions/auth";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(user);

  const [input, setInput] = React.useState({ name: false, email: false });

  const refreshToken = getCookie("refreshToken");

  const [isChange, setIsChange] = React.useState(false);

  
  const logout = () => {
    dispatch(fetchLogout(refreshToken));
  };

  const link = `${styles.link} text text_type_main-medium `;
  const activelink = "text_color_primary";
  const inactiveLink = "text_color_inactive ";

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setIsChange(true);
  };

    function onReset() {
      setValue({ name: user.name, email: user.email });
      setIsChange(false);
    }

  function profileFormSubmit(e) {
    e.preventDefault();
    dispatch(fetchUpdateUserInfo(value));
    setIsChange(false);
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.navContainer}>
        <nav className={styles.navLink}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              link + (isActive ? activelink : inactiveLink)
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              link + (isActive ? activelink : inactiveLink)
            }
          >
            История заказов
          </NavLink>
          <NavLink
            onClick={logout}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </NavLink>
        </nav>
        <p className={`${styles.text} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form onSubmit={profileFormSubmit} className={styles.formContainer}>
        <Input
          onChange={onChange}
          value={value?.name || ""}
          placeholder={"Имя"}
          name={"name"}
          icon={"EditIcon"}
          extraClass="mb-6"
          onIconClick={() => setInput({ ...input, name: !input.name })}
          disabled={input.name ? false : true}
        />
        <EmailInput
          onChange={onChange}
          value={value?.email || ""}
          name={"email"}
          placeholder={"Логин"}
          icon={"EditIcon"}
          extraClass="mb-6"
          onIconClick={() => setInput({ ...input, email: !input.email })}
          disabled={input.email ? false : true}
        />
        <PasswordInput
          onChange={onChange}
          value={value?.password || "*******"}
          name={"password"}
          placeholder={"Пароль"}
          icon={"EditIcon"}
          extraClass="mb-6"
          disabled
        />
        {isChange && (
          <div className={`mt-6 mr-4 ${styles.buttonBlock}`}>
            <Button
              size="medium"
              htmlType="button"
              type="secondary"
              onClick={onReset}
            >
              Отмена
            </Button>
            <Button htmlType="submit" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
