import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";
import Constructor from "../../pages/constructor.jsx";
import NotFound from "../../pages/notFound.jsx";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgotPassword";
import ResetPassword from "../../pages/resetPassword";
import Profile from "../../pages/profile";
import ProtectedRouteElement from "../ProtectedRoute/protectedRoute.jsx";
import Ingredient from "../../pages/ingredient-details";
import { fetchCheckAccess } from "../../services/actions/auth.js";
import { Modal } from "../modal/modal.jsx";
import { Auth, UnAuth } from "../ProtectedRoute/protectedRoute.jsx";

function App() {
  // const userAuth = useSelector((store) => store.authReducer.userAuth);
  const dispatch = useDispatch();

  const location = useLocation();

  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(fetchCheckAccess());
  }, [dispatch]);

  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <Routes>
          <Route path="/" element={<Constructor/>} />
          <Route path="/login" element={<UnAuth component={<Login/>} />} />
          <Route path="/register" element={<UnAuth component={<Register/>} />} />
          <Route path="/forgot-password" element={<UnAuth component={<ForgotPassword/>} />} />
          <Route path="/reset-password" element={<UnAuth component={<ResetPassword/>} />} />
          <Route path="/profile" element={<Auth component={<Profile/>} />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
