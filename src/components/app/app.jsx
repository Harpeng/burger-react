import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader.jsx'
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/burgerConstructor.jsx';
import {dataBurger} from '../../utils/data.js';

function App() {
  console.log('привет')
  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <BurgerIngredients data={dataBurger}/>
        <BurgerConstructor data={dataBurger} />
      </main>
    </section>
  );
}

export default App;