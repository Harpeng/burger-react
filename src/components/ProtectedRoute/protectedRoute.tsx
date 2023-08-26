import React, {FC, ReactElement} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hook";
import PropTypes from "prop-types";

interface IProtectedRouteElement {
  unAuth?: boolean;
  component: JSX.Element;
}


const ProtectedRouteElement = ({ unAuth = false, component }:IProtectedRouteElement) => {
const userAuth = useSelector((store) => store.authReducer.userAuth);
const user = useSelector((store) => store.authReducer.user);
const location = useLocation();

console.log(userAuth)


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
export const UnAuth = ({ component}:IProtectedRouteElement) => (
<ProtectedRouteElement unAuth={true} component={component} />
);


export default ProtectedRouteElement;
