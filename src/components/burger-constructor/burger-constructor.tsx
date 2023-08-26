import React, {FC} from "react";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "../../services/hook";
import {
  closeOrderModal,
  openOrderDetails,
} from "../../services/actions/order-details";
import {
  addItem,
} from "../../services/actions/burger-constructor";
import { useDrop } from "react-dnd";
import BurgerFillingItem from "./burger-fillings.jsx/burger-fillings";
import { Reorder } from "framer-motion";
import { RESET_INGREDIENT, SORT_ITEM } from "../../services/constants/index";
import { useNavigate } from "react-router-dom";
import { IburgerInfo } from "../../services/type/data";

const BurgerConstructor:FC = () => {
  const dispatch = useDispatch();
  const { bun, fillingItems } = useSelector((store) => ({
    bun: store.burgerConstructorReducer.bun,
    fillingItems: store.burgerConstructorReducer.burgerConstructorItems,
  }));

  const navigate = useNavigate();

  const state = useSelector((store) => store);

  const getNubmerId = state.orderDetailsReducer.servOrder;

  const userAuth = state.authReducer.userAuth;

  const orderOverlay = state.orderDetailsReducer.openModal;

  const closeModal = () => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  };

  const getOrder = () => {
    const arrayId = [bun.id, ...fillingItems.map((item:IburgerInfo) => item.id), bun.id];
    userAuth ?
    dispatch(openOrderDetails(arrayId)) :
    navigate("/login");
  };

  const handleDrop = (item:IburgerInfo) => {
    dispatch(addItem(item));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",

    drop(item:IburgerInfo) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = React.useMemo(
    () =>
      fillingItems.reduce(
        (price:number, item:IburgerInfo) => (price += item.price),
        bun ? bun.price * 2 : 0
      ),
    [bun, fillingItems]
  );

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor}`}>
      <div className={styles.itemsBar}>
        <ul className={`${styles.list} mt-25 ml-4 mr-4`}>
          <li className={`${styles.item} ml-8`}>
            {bun && (
              <ConstructorElement
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.src}
                type="top"
                isLocked={true}
              />
            )}
            {!bun && (
              <div className={`${styles.clearConstructor}`}>
                <p className="text text_type_main-default text_color_inactive">
                  Перетащите сюда булку
                </p>
              </div>
            )}
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
          {bun && !fillingItems.length && (
            <div className={`${styles.clearIngredient}`}>
              <p className="text text_type_main-default text_color_inactive">
                Перетащите сюда начинку
              </p>
            </div>
          )}
          {fillingItems.map((item:IburgerInfo) => {
            return (
              <BurgerFillingItem
                key={item.uniqueId}
                burgerConstructorItems={item}
              ></BurgerFillingItem>
            );
          })}
        </Reorder.Group>
        <ul className={`${styles.list} ml-15 mb-10`}>
          <li className={`${styles.item}`}>
            {bun && (
              <ConstructorElement
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.src}
                type="bottom"
                isLocked={true}
              />
            )}
          </li>
        </ul>
      </div>
      {fillingItems[0] && (
        <div className={`${styles.order} mr-4`}>
          <p className={`text text_type_digits-medium mr-3`}>
            {totalPrice ? totalPrice : 0}
          </p>
          <div className={`${styles.logo} pr-10`}>
            <CurrencyIcon type="primary" />
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
              <OrderDetails orderNumber={getNubmerId} />
        </Modal>
      )}
    </section>
  );
}


export default BurgerConstructor;
