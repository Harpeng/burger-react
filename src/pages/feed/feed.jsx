import React from "react";
import styles from "./feed.module.css";
import ListFeed from "../../components/list-feed/list-feed";
import OrderLine from "../../components/order-line/order-line.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/socketAction";
import { wsUrlAll } from "../../utils/utils";

function Feed() {
  const { orders, total, totalToday } = useSelector(
    (store) => store.socketReducer
  );

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

  console.log(wsUrlAll)

  React.useEffect(() => {
    dispatch(wsConnectionStart(wsUrlAll));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);



  return (
    <div className={styles.feed}>
      <ListFeed orders={orders} isFeedList={false} />
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
