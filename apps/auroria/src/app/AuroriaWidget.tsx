import React, { useState } from 'react';
import styles from './widget.module.css';

const AuroriaWidget = () => {
  const [likes, setLikes] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.card} ${styles.auroriaCard}`}>
      <div className={styles.cardHeader}>
        <h2>Welcome from Auroria!</h2>
        <span className={styles.badge}>{likes} ❤️</span>
      </div>
      <p>This is the dynamically loaded widget from the Auroria remote.</p>
      
      {expanded && (
        <div className={styles.expandedContent}>
          <p>Auroria features beautiful northern lights and stunning ice formations.</p>
        </div>
      )}
      
      <div className={styles.cardActions}>
        <button 
          className={styles.actionButton}
          onClick={() => setLikes(prev => prev + 1)}
        >
          Like
        </button>
        <button 
          className={styles.actionButton}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default AuroriaWidget; 