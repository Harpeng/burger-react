import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";


const ProtectedRouteElement = ({ unAuth = false, component }) => {
const userAuth = useSelector((store) => store.authReducer.userAuth);
const user = useSelector((store) => store.authReducer.user);
const location = useLocation();

console.log(userAuth)

// if (!userAuth) {
//   // Запрос еще выполняется
//   // Выводим прелоадер в ПР
//   // Здесь возвращается просто null для экономии времени
//   return null;
// }

if (unAuth && user) {
  // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
  // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
  const { from } = location.state || { from: { pathname: "/" } };
  return <Navigate to={from} />;
}

if (!unAuth && !user) {
  return <Navigate to="/login" state={{ from: location }} />;
}


return component;
};

export const Auth = ProtectedRouteElement;
export const UnAuth = ({ component }) => (
<ProtectedRouteElement unAuth={true} component={component} />
);


ProtectedRouteElement.propTypes = {
    unAuth: PropTypes.bool,
    component: PropTypes.element,
  };

export default ProtectedRouteElement;
