import React from 'react';
import styles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/burgerConstructor.jsx';
import data from '../../utils/data.jsx';

function App() {
  console.log('привет')
  return (
    <section className={styles.page}>
      <AppHeader />
      <main className={styles.page__content}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} />
      </main>
    </section>
  );
}

export default App;