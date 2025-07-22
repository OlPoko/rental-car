import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import heroBg from "../assets/Picture@2x.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button className={styles.button} onClick={() => navigate("/catalog")}>
          View Catalog
        </button>
      </div>
    </section>
  );
};

export default HomePage;
