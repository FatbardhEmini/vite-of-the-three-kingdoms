import styles from './app.module.css'; // Import styles used by the fallback

interface WidgetErrorFallbackProps {
  error: Error;
  name: string;
}


function WidgetErrorFallback({name }: WidgetErrorFallbackProps) {
  return (
    <div className={styles.errorFallback}>
      Error loading {name}
    </div>
  );
}

export default WidgetErrorFallback; 