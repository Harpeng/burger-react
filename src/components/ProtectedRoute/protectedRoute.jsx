import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRouteElement = ({ unAuth = false, component }) => {
//    const {loaded } = useSelector((store) => store.authReducer);


//     if (!loaded) {
//         return <p>Загрузка...</p>;
//       }
  
  
//     if (!userAuth) {
//       return (
//         <Navigate to={to} replace/>
//       )
//     }

//     return (
//         <Outlet/>
//       )


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


export default ProtectedRouteElement;
