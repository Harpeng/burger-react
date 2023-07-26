import React from "react";
import styles from "./list-feed.module.css";
import ListElement from "../list-element/list-element";
import { v4 as uuidv4 } from "uuid";

function ListFeed({ isFeedList, orders }) {

    console.log(orders)
  return (
      <ul className={styles.list}>
        {orders.map((order) => {
          return (
            <ListElement key={uuidv4()} order={order} isFeedList={isFeedList} />
          );
        })}
      </ul>
  );
}

export default ListFeed;
