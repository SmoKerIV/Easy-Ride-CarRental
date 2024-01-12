import styles from "./container.module.css";

const Container = ({ children, width = 1400 }) => {
  return (
    <div className={styles.container} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

export default Container;
