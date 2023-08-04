import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchRegister, setRegisterValue } from "../../services/actions/auth";

function Register() {
  const {registerForm} = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function onChange(e) {
    dispatch(setRegisterValue(e.target.name, e.target.value));
  }


  const submitRegisterForm = (e) => {
    e.preventDefault();
    dispatch(fetchRegister(registerForm, () => navigate("/login")));
  };


  return (
    <div className={styles.registerContainer}>
      <h2 className={`text text_type_main-medium text_color_primary mb-6`}>
        Регистрация
      </h2>
      <form onSubmit={submitRegisterForm}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={registerForm.name || ''}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={registerForm.email || ""}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={registerForm.password || ""}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={`${styles.link} text_color_accent text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
      </div>
  );
}

export default Register;
