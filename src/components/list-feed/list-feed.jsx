import React from "react";
import styles from "./list-feed.module.css";
import ListElement from "../list-element/list-element";
import { v4 as uuidv4 } from "uuid";

function ListFeed({ isFeedList, orders, isOrder}) {

  return (
      <ul className={styles.list}>
        {orders.reverse().map((order) => {
          return (
            <ListElement key={uuidv4()} order={order} isFeedList={isOrder} />
          );
        })}
      </ul>
  );
}

export default ListFeed;
