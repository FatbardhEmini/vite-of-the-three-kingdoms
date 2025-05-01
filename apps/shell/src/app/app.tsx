// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import React, { Suspense } from 'react';
import styles from './app.module.css'; // Import CSS module

// Dynamically import the widgets from the remotes
// The remote name ('auroria', 'borealis', 'cygnus') must match the key in the shell's vite.config.ts remotes object
// The exposed module ('./Widget') must match the key in the remote's vite.config.ts exposes object
const AuroriaWidget = React.lazy(() => import('auroria/Widget'));
const BorealisWidget = React.lazy(() => import('borealis/Widget'));
const CygnusWidget = React.lazy(() => import('cygnus/Widget'));

export function App() {
  return (
    <div className={styles.container}> {/* Use container style */}
      <h1>Vite of the Three Kingdoms - Shell Host</h1>
      <p>Loading widgets from remote applications using Module Federation and Vite:</p>

      <div className={styles.widgetsContainer}> {/* Add a wrapper for the widgets */}
        <Suspense fallback={<div>Loading Auroria Widget...</div>}>
          <AuroriaWidget />
        </Suspense>

        <Suspense fallback={<div>Loading Borealis Widget...</div>}>
          <BorealisWidget />
        </Suspense>

        <Suspense fallback={<div>Loading Cygnus Widget...</div>}>
          <CygnusWidget />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
