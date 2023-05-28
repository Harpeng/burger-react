import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";
import Constructor from "../../pages/constructor.jsx";
import NotFound from "../../pages/notFound.jsx";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgotPassword";
import ResetPassword from "../../pages/resetPassword";
import Profile from "../../pages/profile";
import ProtectedRouteElement from "../ProtectedRoute/protectedRoute.jsx";

function App() {
  const { userAuth } = useSelector((store) => store.authReducer.userAuth);

  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <Routes>
          <Route path="/" element={<Constructor />} />
          <Route element={<ProtectedRouteElement userAuth={userAuth} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRouteElement userAuth={!userAuth} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/ingredients/:id" element={<Constructor />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
