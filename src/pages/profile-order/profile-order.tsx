import {FC} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hook";
import {
  wsConnectionStartProfile,
  wsConnectionCloseProfile,
} from "../../services/actions/socketActionProfile";
import styles from "./profile-order.module.css";
import { wsUrlProfile } from "../../utils/utils";
import ListFeed from "../../components/list-feed/list-feed";
import { getCookie } from "../../utils/cookie";

const ProfileOrder:FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (store) => store.socketProfileReducer.orders
  );



  if (orders.length > 50) {
    orders.length = 50;
  }

  useEffect(() => {
    dispatch(wsConnectionStartProfile(`${wsUrlProfile}?token=${getCookie("accessToken")}`));
    return () => {
      dispatch(wsConnectionCloseProfile());
    };
  }, []);


  return (
    orders && (
      <div className={styles.container}>
        <ListFeed orders={orders} isOrder={false} titleClassName={styles.title} />
      </div>
    )
  );
}

export default ProfileOrder;
