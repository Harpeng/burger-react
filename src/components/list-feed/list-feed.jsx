import React from "react";
import styles from "./list-feed.module.css";
import ListElement from "../list-element/list-element";
import { v4 as uuidv4 } from "uuid";

function ListFeed({ isFeedList, orders }) {

    console.log(orders)
  return (
    <section className={styles.list__container}>
      <h2 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>
        Лента Заказов
      </h2>
      <ul className={styles.list}>
        {orders.map((order) => {
          return (
            <ListElement key={uuidv4()} order={order} isFeedList={isFeedList} />
          );
        })}
      </ul>
    </section>
  );
}

export default ListFeed;
