import React from "react";
import styles from "./order-line.module.css";
import { v4 as uuidv4 } from "uuid"

function OrderLine({ workList, doneList, total, totalToday }) {
  return (
    <section className={styles.statistic}>
      <div className={styles.ready__check}>
        <div className={styles.list}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <ul className={styles.list__digit}>
            {doneList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`text text_type_digits-default ${styles.done__order}`}
                >{item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.list}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <ul className={styles.list__digit}>
          {workList.map((item, index) => {
              return (
                <li
                key={index}
                className={`${styles.work__order} text text_type_digits-default`}
              >
                {item}
              </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.total__digit}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.digit} text text_type_digits-large`}>{total}</p>
      </div>
      <div className={styles.total__digit}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.digit} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  );
}

export default OrderLine;
