import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgotPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchForgotPassword, setFormValue } from "../services/actions/auth.js";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  const { forgotPasswordForm } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function goToResetPage() {
    navigate("/reset-password", { replace: false });
  }

  const onChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };


  function submitForgotPassword(e) {
    e.preventDefault();
    dispatch(fetchForgotPassword(forgotPasswordForm));
    goToResetPage();
  }


  return (
    <div className={styles.forgotPasswordContainer}>
      <h2 className={`text text_type_main-medium text_color_primary mb-6`}>
        Восстановление пароля
      </h2>
      <form onSubmit={submitForgotPassword}>
        <EmailInput
          onChange={onChange}
          value={forgotPasswordForm.email || ""}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <Button
          extraClass={styles.button}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
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

export default ForgotPassword;
