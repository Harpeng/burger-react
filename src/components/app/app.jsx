import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {Modal} from "../modal/modal.jsx";
import {OrderDetails} from "../order-details/order-details.jsx";
import {IngredientDetails} from "../ingredient-details/ingredient-detail.jsx";

function App() {
  const [state, setState] = React.useState({
    dataBurger: [],
    loading: false,
    error: false,
  });

  const [item, setItem] = React.useState(null);

  const openItem = (item) => {
    if (item) {
      setItem(item);
    }
  };

  const [order, setOrder] = React.useState(false);

  const closePopup = (e) => {
    setOrder(false);
    setItem(null);
    console.log('привет');
  };


  const openOrder = () => {
    setOrder(true);
    console.log('ghbdt');
  };

  React.useEffect(() => {
    const getBurgerData = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch("https://norma.nomoreparties.space/api/ingredients")
          .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
          .then((data) => {
            setState({ ...state, dataBurger: data.data });
          });
      } catch (err) {
        console.log("Ошибка");
        setState({ ...state, loading: false, error: true });
      }
    };
    getBurgerData();
  }, []);

  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <BurgerIngredients openItem={openItem} data={state.dataBurger} />
        <BurgerConstructor data={state.dataBurger} openOrder={openOrder} />
      </main>
      {order && <Modal closePopup={closePopup} title="">
        <OrderDetails order={order} title={"034536"}/>
      </Modal>}
      {item && <Modal closePopup={closePopup} title="Детали ингредиента">
        <IngredientDetails item={item}/>
        </Modal>}
    </section>
  );
}

export default App;
