import React from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {burgerPropTypes} from "../../utils/types.js";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataContext, HandlerContext, PriceContext} from "../../utils/context.jsx";
import {Modal} from "../modal/modal.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";


function BurgerConstructor() {

  const data = React.useContext(DataContext).state.dataBurger;
  const setOrder = React.useContext(HandlerContext).setOrder;
  const [stateOrder, setStateOrder] = React.useState({
    overlay: false,
    isLoading: false,
    hasError: false,
  });
  const buns= data.filter(
    (element) => element.type === "bun"
  );

  const closePopup = () => {
    setOrder(false);
    setStateOrder({...stateOrder, overlay: false});
  };


  const fillings = data.filter(item => item.type !== 'bun')

    const openOrder = () => {
      setOrder(true);
      console.log("ghbdt");
  };

  const {price, priceDispatch} = React.useContext(PriceContext);

  React.useEffect(() => {
      let total = 0;
      priceDispatch({type: 'reset'});
      data.map(item => (total += item.price));
      priceDispatch({type: 'increment', price: total});
    },
    [data, priceDispatch]
  );

  const orderPrice = [];
  const orderId = [];

    const getOrderId = async () => {
      try {
        setStateOrder({ ...stateOrder, isLoading: true, hasError: false });
        fetch("https://norma.nomoreparties.space/api/orders", {
          method: 'POST',
          headers: {
            authorization: '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"ingredients": orderId})
        })
        .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
        .then((data) => {
          setStateOrder({
            ...stateOrder,
            order: data.order.number,
            overlay: true,
            isLoading: false,
          });
        })
      } catch (err) {
        console.log("Ошибка");
        setStateOrder({ ...stateOrder, hasError: true, isLoading: false })
      }
    };


  const getNubmerId = () => {
    openOrder();
    getOrderId();
  }

  return (
    <section className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 ml-4 mr-4`}>
          {buns.map((item) => {
            if (item._id === "60d3b41abdacab0026a733c6") {
              orderPrice.push(item.price);
              orderId.push(item._id);
              return (
                <li key={item._id} className={`${styles.item} ml-8`}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${item.name} (верх)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>
        <ul className={`${styles.list} ${styles.itemUnlock} ml-4 mr-4`}>
          {fillings.map((item) => {
              orderPrice.push(item.price);
              orderId.push(item._id);
              return (
                <li key={item._id} className={`${styles.item}  mb-4 pr-2`}>
                  <span className={`mr-2`}>
                    <DragIcon />
                  </span>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
          })}
        </ul>
        <ul className={`${styles.list} ml-10 mb-10`}>
          {buns.map((item) => {
            if (item._id === "60d3b41abdacab0026a733c6") {
              orderPrice.push(item.price);
              orderId.push(item._id);
              return (
                <li key={item._id} className={`${styles.item}`}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${item.name} (низ)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={`${styles.order} mr-4`}>
        <p className={`text text_type_digits-medium mr-3`}>{price.price}</p>
        <div className={`${styles.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={getNubmerId}>
          Оформить заказ
        </Button>
      </div>
      {stateOrder.overlay && (
          <Modal closePopup={closePopup} title={""}>
            {stateOrder.isLoading && "Загрузка..."}
            {stateOrder.hasError && "Произошла ошибка"}
            {!stateOrder.isLoading && !stateOrder.hasError && (
              <OrderDetails orderNumber={stateOrder.order} />
            )}
          </Modal>
        )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes),
  getNubmerId: PropTypes.func,
};

export default BurgerConstructor;