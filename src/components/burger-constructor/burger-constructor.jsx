import React from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { burgerPropTypes } from "../../utils/types.js";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DataContext,
  HandlerContext,
  PriceContext,
} from "../../utils/context.jsx";
import { Modal } from "../modal/modal.jsx";
import { v4 as uuidv4 } from "uuid";
import { OrderDetails } from "../order-details/order-details.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  openOrderModal,
  closeOrderModal,
  openOrderDetails,
} from "../../services/actions/order-details.js";
import {
  addIngredient,
  deleteIngredient,
  addItem,
  ADD_ITEM 
} from "../../services/actions/burger-constructor.js";
import { useDrop } from 'react-dnd';

function BurgerConstructor() {
  const dataBurger = useSelector(
    (store) => store.burgerIngredientsReducer.dataBurger
  );
  const dispatch = useDispatch();

  const state = useSelector((store) => store);

  const burgerConstructorItems = useSelector(
    (store) => store.burgerIngredientsReducer.burgerConstructorItems
  );

  const orderOverlay = state.orderDetailsReducer.openModal;

  const closeModal = () => {
    dispatch(closeOrderModal());
  };

  const bun = dataBurger.filter((element) => element.type === "bun");

  const bunArr = [bun].map((item) => item.id);
  const burgerConstructorItemsArr = burgerConstructorItems.map(
    (item) => item.id
  );
  const orderId = [...bunArr, ...burgerConstructorItemsArr];

  const setOrderPrice = () => {
    return burgerConstructorItems.reduce(
      (sum, current) => sum + current.price,
      0 + bun.price ? bun.price * 2 : 0
    );
  };

  const getOrder = () => {
    dispatch(openOrderDetails(orderId));
    dispatch(openOrderModal());
  };

  const handleDrop = (itemId) => {
    dispatch({
      type: ADD_ITEM,
      item: { ...itemId },
    });
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'item',
    drop(itemId) {
      handleDrop(addItem(itemId));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver()
    })
})


  // const { dataBurger } = useSelector(store => store.burgerIngredientsReducer);

  // const setOrder = React.useContext(HandlerContext).setOrder;
  // const [stateOrder, setStateOrder] = React.useState({
  //   overlay: false,
  //   isLoading: false,
  //   hasError: false,
  // });
  // const buns= dataBurger.filter(
  //   (element) => element.type === "bun"
  // );

  // const closePopup = () => {
  //   setOrder(false);
  //   setStateOrder({...stateOrder, overlay: false});
  // };

  // const fillings = dataBurger.filter(item => item.type !== 'bun')

  //   const openOrder = () => {
  //     setOrder(true);
  //     console.log("ghbdt");
  // };

  // const {price, priceDispatch} = React.useContext(PriceContext);

  // React.useEffect(() => {
  //     let total = 0;
  //     priceDispatch({type: 'reset'});
  //     dataBurger.map(item => (total += item.price));
  //     priceDispatch({type: 'increment', price: total});
  //   },
  //   [dataBurger, priceDispatch]
  // );

  // const orderPrice = [];

  //   const getOrderId = async () => {
  //     try {
  //       setStateOrder({ ...stateOrder, isLoading: true, hasError: false });
  //       fetch("https://norma.nomoreparties.space/api/orders", {
  //         method: 'POST',
  //         headers: {
  //           authorization: '',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({"ingredients": orderId})
  //       })
  //       .then((res) =>
  //       res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  //     )
  //       .then((data) => {
  //         setStateOrder({
  //           ...stateOrder,
  //           order: data.order.number,
  //           overlay: true,
  //           isLoading: false,
  //         });
  //       })
  //     } catch (err) {
  //       console.log("Ошибка");
  //       setStateOrder({ ...stateOrder, hasError: true, isLoading: false })
  //     }
  //   };

  // const getNubmerId = () => {
  //   openOrder();
  //   getOrderId();
  // }

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 ml-4 mr-4`}>
          {bun.name && (
            <li key={bun._id} className={`${styles.item} ml-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
        </ul>
        {!burgerConstructorItems[0] && (
            <div className={styles.emptyBlock}>
              <p
                className={`${styles.emptyBlockMsg} mb-4 pr-2 text text_type_main-default text_color_inactive mt-10 mb-5`}
              >
                Добавь ингредиенты
              </p>
            </div>
          )}
        <ul className={`${styles.list} ${styles.itemUnlock} ml-4 mr-4`}>
          {burgerConstructorItems.map((item) => {
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
          {bun.name && (
            <li key={bun._id} className={`${styles.item}`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          )}
        </ul>
      </div>
      {burgerConstructorItems[0] && (
      <div className={`${styles.order} mr-4`}>
      <p className={`text text_type_digits-medium mr-3`}>{setOrderPrice}</p>
      <div className={`${styles.logo} pr-10`}>
        <CurrencyIcon  />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={getOrder}
      >
        Оформить заказ
      </Button>
      </div>
          )}
      {orderOverlay && (
        <Modal closePopup={closeModal} title={""}>
          {state.orderDetailsReducer.orderRequest && "Загрузка..."}
          {state.orderDetailsReducer.orderError && "Произошла ошибка"}
          {!state.orderDetailsReducer.orderRequest && !state.orderDetailsReducer.orderError && (
            <OrderDetails orderNumber={state.orderDetailsReducer.servOrder} />
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
