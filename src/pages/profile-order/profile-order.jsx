import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStartProfile,
  wsConnectionCloseProfile,
} from "../../services/actions/socketActionProfile.js";
import styles from "./profile-order.module.css";
import { wsUrlProfile } from "../../utils/utils.js";
import { fetchCheckAccess } from "../../services/actions/auth.js";
import ListFeed from "../../components/list-feed/list-feed.jsx";

export default function ProfileOrder() {
  const dispatch = useDispatch();
  const errorState = useSelector(
    (store) => store.socketProfileReducer.errorState
  );

  const orders = useSelector(
    (store) => store.socketProfileReducer.orders
  );



  if (orders.length > 50) {
    orders.length = 50;
  }

  useEffect(() => {
    dispatch(wsConnectionStartProfile(wsUrlProfile));
    return () => {
      dispatch(wsConnectionCloseProfile());
    };
  }, []);

  useEffect(() => {
    if (errorState) {
      dispatch(wsConnectionCloseProfile());
      dispatch(fetchCheckAccess())
        .then(() => dispatch(wsConnectionStartProfile(wsUrlProfile)))
        .catch(() => dispatch(wsConnectionCloseProfile()));
    }
  }, [errorState]);

  return (
    orders && (
      <div className={styles.container}>
        <ListFeed orders={orders} isOrder={false} titleClassName={styles.title} />
      </div>
    )
  );
}
