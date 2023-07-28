import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import OrderConsist from "../../components/order-consist/order-consist";
import { wsUrlAll, wsUrlProfile } from "../../utils/utils.js";
import styles from "./order-inform.module.css";
import { fetchItems } from "../../services/actions/burger-ingredient";

export default function OrderInform() {
  const dispatch = useDispatch();
  const userAuth = useSelector((store) => store.authReducer.userAuth);
  

  React.useEffect(() => {
    dispatch(fetchItems());
    userAuth
      ? dispatch(wsConnectionStart(wsUrlProfile))
      : dispatch(wsConnectionStart(wsUrlAll));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.socketReducer.orders);
  const { id } = useParams();
  const currentOrder = orders.find((item) => item._id === id);

  console.log(orders)


  return (
    currentOrder && (
      <div className={styles.container}>
        <OrderConsist />
      </div>
    )
  );
}
