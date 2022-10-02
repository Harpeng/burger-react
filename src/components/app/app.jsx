import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader.jsx'

function App() {
  console.log('привет')
  return (
    <div className={styles.page}>
      <AppHeader />
    </div>
  );
}

export default App;