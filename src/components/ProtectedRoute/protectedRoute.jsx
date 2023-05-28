import React, {useEffect} from "react";
import { Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchCheckAccess} from "../../services/actions/auth.js";
import { getCookie } from "../../utils/cookie";

const ProtectedRouteElement = ({ userAuth}) => {
    const { user } = useSelector((store) => store.authReducer);
    const refreshToken = getCookie("refreshToken");

  
    const dispatch = useDispatch();

    console.log(user);
    console.log(userAuth);
    console.log(refreshToken);
  
    useEffect(() => {
      if (!user && refreshToken) {
        dispatch(fetchCheckAccess());
        console.log('привет')
      }
    }, [refreshToken, user, dispatch]);
  
    if (!user && !refreshToken && userAuth ) {
      return (
        <Navigate to="/login" replace/>
      )
    }

    if (user && !userAuth) {
        return (
          <Navigate to="/" replace/>
        )
      }

    return (
        <Outlet/>
      )
      
};

export default ProtectedRouteElement;
