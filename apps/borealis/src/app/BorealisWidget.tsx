import React from 'react';
import styles from './widget.module.css'; // Import styles

const BorealisWidget = () => {
  return (
    <div className={styles.card}> {/* Apply card style */}
      <h2>Greetings from Borealis!</h2>
      <p>This is the Borealis chart widget, loaded via Module Federation.</p>
      {/* Placeholder for a chart */}
    </div>
  );
};

export default BorealisWidget; 