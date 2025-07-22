// src/components/HeroBanner/HeroBanner.jsx
import styles from "./HeroBanner.module.css";

const HeroBanner = ({ onViewCatalog }) => (
  <section className={styles.banner}>
    <div className={styles.text}>
      <h1>Find Your Perfect Ride</h1>
      <p>Explore our fleet and book your dream car today.</p>
      <button onClick={onViewCatalog}>View Catalog</button>
    </div>
    <div className={styles.imageWrapper}>
      <img src="/src/assets/Picture@2x.jpg" alt="Car illustration" />
    </div>
  </section>
);

export default HeroBanner;
