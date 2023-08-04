import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./resetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword, setPasswordValue } from "../../services/actions/auth";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  const { resetPasswordForm} = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(setPasswordValue(e.target.name, e.target.value));
  };

  const navigate = useNavigate();

  const submitResetPassword = (e) => {
    e.preventDefault();
    dispatch(fetchResetPassword(resetPasswordForm));
  };


  return (
    <div className={styles.resetContainer}>
      <h2 className={`text text_type_main-medium text_color_primary mb-6`}>
        Восстановление пароля
      </h2>
      <form onSubmit={submitResetPassword}>
        <PasswordInput
          onChange={onChange}
          value={resetPasswordForm.password || ""}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={resetPasswordForm.token || ""}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
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

export default ResetPassword;
