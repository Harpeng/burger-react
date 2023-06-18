import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchLogin, setLoginValue} from "../services/actions/auth";

function Login() {
  const {loginForm, loginSubmit, userAuth} = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onChange = (e) => {
    dispatch(setLoginValue(e.target.name, e.target.value));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(loginForm));
  };


  return (
    <div className={styles.loginContainer}>
      <h2 className={`text text_type_main-medium text_color_primary mb-6`}>
        Вход
      </h2>
      <form onSubmit={submitForm} className={styles.loginForm}>
        <EmailInput
          onChange={onChange}
          value={loginForm.email || ''}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={loginForm.password || ''}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${styles.link} text_color_accent text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`${styles.link} text_color_accent text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
}

export default Login;
