import React from "react";
import styles from "./feed.module.css";
import ListFeed from "../../components/list-feed/list-feed";
import OrderLine from "../../components/order-line/order-line.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import { wsUrlAll, wsUrlProfile } from "../../utils/utils";

function Feed() {
  const { orders, total, totalToday } = useSelector(
    (store) => store.socketReducer
  );

  const userAuth = useSelector((store) => store.authReducer.userAuth);

  const dispatch = useDispatch();

  const { doneList, workList } = React.useMemo(() => {
    if (!orders.length) {
      return { doneList: [], workList: [] };
    }
    return orders.reduce(
      (count, item) => {
        switch (item.status) {
          case "done":
            count.doneList.push(item.number);
            break;
          case "pending":
            count.workList.push(item.number);
            break;
        }
        return count;
      },
      { doneList: [], workList: [] }
    );
  }, [orders]);



  React.useEffect(() => {
    userAuth
      ? dispatch(wsConnectionStart(wsUrlProfile))
      : dispatch(wsConnectionStart(wsUrlAll));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);


  return (
    <div className={styles.feed}>
      <div className={styles.list__container}>
        <h2 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>
          Лента Заказов
        </h2>
        <ListFeed orders={orders} isOrder={false} />
      </div>
      <OrderLine
        doneList={doneList}
        workList={workList}
        total={total}
        totalToday={totalToday}
      />
    </div>
  );
}

export default Feed;
