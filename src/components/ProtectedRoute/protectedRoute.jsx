import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRouteElement = ({ userAuth, to}) => {
   const {loaded } = useSelector((store) => store.authReducer);


    if (!loaded) {
        return <p>Загрузка...</p>;
      }
  
  
    if (!userAuth) {
      return (
        <Navigate to={to} replace/>
      )
    }

    return (
        <Outlet/>
      )


  }

export default ProtectedRouteElement;
