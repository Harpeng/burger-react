import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import OrderConsist from "../../components/order-consist/order-consist";
// import { wsUrlAll, wsUrlProfile } from "../../utils/utils.js";
import styles from "./order-inform.module.css";
import { request, handleResponse } from "../../utils/api";
import { fetchOrder } from "../../services/actions/order-details";

export default function OrderInform() {
//   const dispatch = useDispatch();
//   const userAuth = useSelector((store) => store.authReducer.userAuth);

//   const orders = useSelector((store) => store.socketReducer.orders);
//   const { id } = useParams();

//   console.log(orders)
// //   const currentOrder = orders.find((item) => item._id === id);

//   const { number } = useParams();

//     const order = useSelector((store) => {
//       let order = store.socketReducer.orders.find((item) => item.number === number);
//       if(order) {
//         return order;
//       };

//       order = store.socketProfileReducer.orders.find((item) => item.number === number);
//       if(order) {
//         return order;
//       };

//      order = store.orderDetailsReducer.servOrder;
//      if(order) {
//         return order;
//      };
// });

// React.useEffect(() => {
//     if(!order) {
//         dispatch(fetchOrder());
//     }
// })

// console.log(orders, "ghbd")
  


//   console.log(currentOrder)

  return (
      <div className={styles.container}>
        <OrderConsist />
      </div>
    )
}
