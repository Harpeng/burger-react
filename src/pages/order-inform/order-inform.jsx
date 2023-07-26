import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import { fetchItems } from "../../services/actions/burger-ingredient";
import OrderConsist from "../../components/order-consist/order-consist";
import { wsUrlAll, wsUrlProfile } from "../../utils/utils.js";
import styles from "./order-inform.module.css";

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
  }, []);

  const orders = useSelector((store) => store.socketReducer.orders);
  const { id } = useParams();
  const currentOrder = orders.find((item) => item._id === id);

  console.log(currentOrder)

  return (
    currentOrder && (
      <div className={styles.container}>
        <OrderConsist />
      </div>
    )
  );
}
