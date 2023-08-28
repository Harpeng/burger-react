import React, {FC} from "react";
import styles from "./list-feed.module.css";
import ListElement from "../list-element/list-element";
import { IOrder } from "../../services/type/data";

interface IListFeed {
  isOrder: boolean;
  orders: Array<IOrder>;
  titleClassName?: string;
}

const ListFeed:FC<IListFeed> = ({orders, isOrder}) => {

  return (
      <ul className={styles.list}>
        {orders.reverse().map((order) => {
          return (
            <ListElement key={order._id} order={order} isOrder={isOrder} />
          );
        })}
      </ul>
  );
}

export default ListFeed;
