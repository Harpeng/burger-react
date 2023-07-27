import React from "react";
import styles from "./list-feed.module.css";
import ListElement from "../list-element/list-element";
import { v4 as uuidv4 } from "uuid";

function ListFeed({ isFeedList, orders }) {

  return (
      <ul className={styles.list}>
        {orders.map((order) => {
          return (
            <ListElement key={order._id} order={order} isFeedList={isFeedList} />
          );
        })}
      </ul>
  );
}

export default ListFeed;
