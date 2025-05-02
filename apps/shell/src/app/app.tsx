import React, { Suspense, ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary'; 
import WidgetErrorFallback from './widget-error-fallback';

import styles from './app.module.css'; 

const AuroriaWidget = React.lazy(() => import('auroria/Widget'));
const BorealisWidget = React.lazy(() => import('borealis/Widget'));
const CygnusWidget = React.lazy(() => import('cygnus/Widget'));


const App = () => {
  const onWidgetError = (error: Error, info: ErrorInfo) => {
    console.error(`Error boundary caught error in widget: ${error}`, info.componentStack);
  };

  return (
    <div className={styles.container}> 
      <h1>Vite of the Three Kingdoms - Shell Host</h1>
      <p>
        Loading widgets from remote applications using Module Federation and Vite:
      </p>

      <div className={styles.widgetsContainer}>
        <ErrorBoundary
          FallbackComponent={(props) => (
            <WidgetErrorFallback {...props} name="Auroria" />
          )}
          onError={onWidgetError}
        >
          <Suspense fallback={<div>Loading Auroria Widget...</div>}>
            <AuroriaWidget />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          FallbackComponent={(props) => (
            <WidgetErrorFallback {...props} name="Borealis" />
          )}
          onError={onWidgetError}
        >
          <Suspense fallback={<div>Loading Borealis Widget...</div>}>
            <BorealisWidget />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary
          FallbackComponent={(props) => (
            <WidgetErrorFallback {...props} name="Cygnus" />
          )}
          onError={onWidgetError}
        >
          <Suspense fallback={<div>Loading Cygnus Widget...</div>}>
            <CygnusWidget />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
