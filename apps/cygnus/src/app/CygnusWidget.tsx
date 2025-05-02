import React, { useState } from 'react';
import styles from './widget.module.css'; // Import styles

const CygnusWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Never');

  const refreshData = () => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1500);
  };

  return (
    <div className={`${styles.card} ${styles.cygnusCard}`}>
      <div className={styles.cardHeader}>
        <h2>Cygnus Dashboard Reporting!</h2>
        {isLoading && <div className={styles.spinner} />}
      </div>
      <p>Dynamically loaded Cygnus dashboard component.</p>
      
      <div className={styles.dashboardData}>
        <div className={styles.dataPoint}>
          <span className={styles.dataLabel}>Status</span>
          <span className={styles.dataValue}>{isLoading ? 'Updating...' : 'Ready'}</span>
        </div>
        <div className={styles.dataPoint}>
          <span className={styles.dataLabel}>Last Updated</span>
          <span className={styles.dataValue}>{lastUpdated}</span>
        </div>
      </div>
      
      <div className={styles.cardActions}>
        <button 
          className={`${styles.actionButton} ${isLoading ? styles.disabled : ''}`}
          onClick={refreshData}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

export default CygnusWidget; 