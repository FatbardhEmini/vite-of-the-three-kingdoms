import React, { useState } from 'react';
import styles from './widget.module.css'; // Import styles

const BorealisWidget = () => {
  const [theme, setTheme] = useState('light');
  const [counter, setCounter] = useState(0);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${styles.card} ${styles.borealisCard} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      <div className={styles.cardHeader}>
        <h2>Greetings from Borealis!</h2>
        <span className={styles.counter}>{counter}</span>
      </div>
      <p>This is the Borealis chart widget, loaded via Module Federation.</p>
      
      <div className={styles.chartPlaceholder}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={styles.chartBar} 
            style={{ height: `${20 + (i * 15)}px` }}
          />
        ))}
      </div>
      
      <div className={styles.cardActions}>
        <button 
          className={styles.actionButton}
          onClick={() => setCounter(prev => prev + 1)}
        >
          Count Up
        </button>
        <button 
          className={styles.actionButton}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default BorealisWidget; 