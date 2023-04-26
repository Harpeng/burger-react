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
import {incrementCount, decreaseCount, setCount} from "../../services/actions/burger-ingredient.js";
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

  const {items} = useSelector((store) => ({
    items: store.burgerIngredientsReducer.dataBurger,
  }))
  

  const state = useSelector((store) => store);

  const getNubmerId = state.orderDetailsReducer.servOrder;


  const orderOverlay = state.orderDetailsReducer.openModal;

  const closeModal = () => {
    dispatch(closeOrderModal());
  };


  const getOrder = () => {
    const arrayId = [
      ...items.map((item) => item._id),
    ];
   dispatch(openOrderDetails(arrayId));
  };

  const handleDrop = (item) => {
    dispatch(addItem(item));
  };

  // const ingredientsCount = React.useMemo(() => {
  //   const result = {};


  //   fillingItems.forEach(item => {
  //     result[item.id] = result[item.id] ?? 0;
  //     result[item.id]++;
  //   });
    

  //   if (bun) result[bun.id] = 2;


  //   return result;
  // }, [fillingItems, bun]);


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

  let totalPrice = React.useMemo(() => fillingItems.reduce(
    (price, item) => (price += item.price),
    bun ? bun.price*2 : 0),
    [bun, fillingItems]);

 

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 ml-4 mr-4`}>
            <li className={`${styles.item} ml-8`}>
            {bun ? ( <ConstructorElement
                id = {bun._id}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.src}
                type="top"
                isLocked={true}
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
                id = {bun.id}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.src}
                type="bottom"
                isLocked={true}
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
          <p className={`text text_type_digits-medium mr-3`}>{totalPrice ? totalPrice : 0}</p>
          <div className={`${styles.logo} pr-10`}>
            <CurrencyIcon type="primary"/>
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
              <OrderDetails orderNumber={getNubmerId} />
            )}
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  bun: PropTypes.objectOf(burgerPropTypes),
};

export default BurgerConstructor;

