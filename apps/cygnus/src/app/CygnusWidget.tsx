import React from 'react';
import styles from './widget.module.css'; // Import styles

const CygnusWidget = () => {
  return (
    <div className={styles.card}> {/* Apply card style */}
      <h2>Cygnus Dashboard Reporting!</h2>
      <p>Dynamically loaded Cygnus dashboard component.</p>
      {/* Placeholder for a dashboard element */}
    </div>
  );
};

export default CygnusWidget; 