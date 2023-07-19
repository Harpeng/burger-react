import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";
import Constructor from "../../pages/constructor/constructor.jsx";
import NotFound from "../../pages/notFound/notFound.jsx";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgotPassword/forgotPassword";
import ResetPassword from "../../pages/resetPassword/resetPassword";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient-details/ingredient-details";
import { fetchCheckAccess } from "../../services/actions/auth.js";
import { Modal } from "../modal/modal.jsx";
import { Auth, UnAuth } from "../ProtectedRoute/protectedRoute.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-detail";
import {
  closeIngredientDetails,
} from "../../services/actions/ingredient-details.js";
import Feed from "../../pages/feed/feed";
import Order from "../../pages/order/order";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(fetchCheckAccess());
  }, [dispatch]);
  
  const navigate = useNavigate();

  const closePopup = (e) => {
    dispatch(closeIngredientDetails());
    navigate(-1);
  };

  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <Routes location={background || location}>
          <Route path="/" element={<Auth component={<Constructor />} />}/>
          <Route path="/login" element={<UnAuth component={<Login />} />} />
          <Route
            path="/register"
            element={<UnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<UnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<UnAuth component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<Auth component={<Profile />} />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          <Route path="/feed" element={<Auth component={<Feed />} />} />
          <Route path="/feed/:id" element={<Auth component={<Order />} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal closePopup={closePopup} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </section>
  );
}

export default App;
