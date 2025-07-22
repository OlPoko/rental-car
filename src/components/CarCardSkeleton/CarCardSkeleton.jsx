// src/components/CarCard/CarCardSkeleton.jsx
import styles from "./CarCardSkeleton.module.css";

const CarCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <div className={styles.title} />
          <div className={styles.price} />
        </div>
        <div className={styles.textRow} />
        <div className={styles.textRow} />
      </div>
    </div>
  );
};

export default CarCardSkeleton;
