import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { Modal } from "../modal/modal.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-detail.jsx";
import { DataContext, HandlerContext, PriceContext } from "../../utils/context.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from "../../services/actions/burger-ingredient";




function App() {



  const [order, setOrder] = React.useState(false);

  const closePopup = (e) => {
    console.log("привет");
  };


  // React.useEffect(() => {
  //   const getBurgerData = async () => {
  //     try {
  //       setState({ ...state, isLoading: true, hasError: false });
  //       fetch("https://norma.nomoreparties.space/api/ingredients")
  //         .then((res) =>
  //           res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  //         )
  //         .then((data) => {
  //           setState({ ...state, dataBurger: data.data });
  //         });
  //     } catch (err) {
  //       console.log("Ошибка");
  //       setState({ ...state, loading: false, error: true });
  //     }
  //   };
  //   getBurgerData();
  // }, []);




  const init = { price: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return {...state, price: state.price + action.price };
      case "reset":
        return { ...state, price: 0 };
      default:
        return state;
    }
  }

  const [price, priceDispatch] = React.useReducer(reducer, init, undefined);

  return (
    <section className={styles.page}>
      <AppHeader />
       <main className={styles.page__content}>
        <HandlerContext.Provider value={{setOrder }}>
          <BurgerIngredients />
          <PriceContext.Provider value={{price, priceDispatch}}>
            <BurgerConstructor />
          </PriceContext.Provider>
        </ HandlerContext.Provider>
      </main>
        {order && (
          <Modal closePopup={closePopup} title="">
            <OrderDetails />
          </Modal>
        )}
    </section>
  );
}

export default App;
