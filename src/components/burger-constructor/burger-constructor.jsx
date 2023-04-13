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
import { v4 as uuid } from "uuid";
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
  ADD_ITEM,
  DELETE_ITEM,
  SORT_ITEM,
  addBuns,
  addFilling
} from "../../services/actions/burger-constructor.js";
import { useDrop } from "react-dnd";
import BurgerFillingItem from "./burger-fillings.jsx/burger-fillings";
import { Reorder } from "framer-motion";
import loader from "../../images/loader.svg";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, fillingItems } = useSelector((store) => ({
    bun: store.burgerConstructorReducer.bun,
    fillingItems: store.burgerConstructorReducer.burgerConstructorItems,
  }));

  // const burgerConstructorItems = useSelector((state) => state.burgerConstructorReducer)
  

  const state = useSelector((store) => store);

  //  const bun = useSelector((state) => state.burgerConstructorReducer.bun);

  const orderOverlay = state.orderDetailsReducer.openModal;

  const closeModal = () => {
    dispatch(closeOrderModal());
  };

  // const bun = dataBurger.filter((element) => element.type === "bun");

  // const bunArr = bun.map((item) => item.id);
  // const burgerConstructorItemsArr = burgerConstructorItems.map(
  //   (item) => item.id
  // );
  // const orderId = [...bunArr, ...burgerConstructorItemsArr];

    // const setOrderPrice = () => {
    //   return burgerConstructorItems.reduce(
    //     (sum, current) => sum + current.price,
    //     0 + bun.price ? bun.price * 2 : 0
    //   );
    // };

  const getOrder = () => {
    // dispatch(openOrderDetails(orderId));
    dispatch(openOrderModal());
  };

  const handleDrop = (item) => {
    dispatch(addItem(item));
  };

  // const [{ isHover }, dropTarget] = useDrop({
  //   accept: "item",
  //   drop(itemId) {
  //     handleDrop(addItem(itemId));
  //   },
  //   collect: (monitor) => ({
  //     isHover: monitor.isOver(),
  //   }),
  // });

  const [{isHover}, dropTarget] = useDrop({
    accept: 'item',

    drop(item) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });


  const deleteElement = (item) => {
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

 

  console.log(bun);

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 ml-4 mr-4`}>
            <li className={`${styles.item} ml-8`}>
            {bun ? ( <ConstructorElement
                type={bun.type}
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.img}

              />
            ) : (
              <div className={`${styles.item}`}>
                <p>выберите булку</p>
              </div>
            )
          }
            </li>
        </ul>
          <Reorder.Group
            className={`${styles.list} ${styles.itemUnlock} ml-4 mr-4`}
            axis="y"
            values={fillingItems}
            onReorder={(sortBurgerConstructorItems) =>
              dispatch({ type: SORT_ITEM, payload: sortBurgerConstructorItems })
            }
          >
            {fillingItems.map((item, index) => {
              return (
                <BurgerFillingItem
                  key={item.id}
                  index={index}
                  burgerConstructorItems={item}
                ></BurgerFillingItem>
              );
            })}
          </Reorder.Group>
        <ul className={`${styles.list} ml-10 mb-10`}>
            <li className={`${styles.item}`}>
            {bun ? ( <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.img}
              />
            ) : (
              <div className={`${styles.item}`}>
                <p>выберите булку</p>
              </div>
            )
          }
            </li>
        </ul>
      </div>
      {fillingItems[0] && (
        <div className={`${styles.order} mr-4`}>
          <p className={`text text_type_digits-medium mr-3`}></p>
          <div className={`${styles.logo} pr-10`}>
            <CurrencyIcon />
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
          {!state.orderDetailsReducer.orderRequest &&
            !state.orderDetailsReducer.orderError && (
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
