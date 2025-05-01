import React from 'react';
import styles from './widget.module.css';

const AuroriaWidget = () => {
  return (
    <div className={styles.card}>
      <h2>Welcome from Auroria!</h2>
      <p>This is the dynamically loaded widget from the Auroria remote.</p>
    </div>
  );
};

export default AuroriaWidget; 