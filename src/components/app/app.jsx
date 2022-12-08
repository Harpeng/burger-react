import React from "react";
import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader.jsx";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../burgerConstructor/burgerConstructor.jsx";
import {Modal} from "../modal/modal.jsx";
import {OrderDetails} from "../orderDetails/orderDetails.jsx";
import {IngredientDetails} from "../ingredientDetails/ingredientDetail.jsx";

function App() {
  let [state, setState] = React.useState({
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

  const closePopup = () => {
    setOrder(false);
    setItem(null);
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
          .then((res) => res.json())
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
