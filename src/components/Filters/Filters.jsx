// src/components/Filters/Filters.jsx
import { useState } from "react";
import styles from "./Filters.module.css";

const brands = ["BMW", "Audi", "Buick", "Subaru", "Volvo"];
const prices = [30, 40, 50, 60, 70, 80];

const Filters = ({ onApply }) => {
  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    mileageFrom: "",
    mileageTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(filters.mileageFrom) < 0 || Number(filters.mileageTo) < 0) {
      alert("Mileage cannot be negative.");
      return;
    }

    onApply(filters);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Car brand</label>
        <select
          name="brand"
          value={filters.make}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Choose a brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Price / 1 hour</label>
        <select
          name="rentalPrice"
          value={filters.rentalPrice}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Choose a price</option>
          {prices.map((p) => (
            <option key={p} value={p}>
              To ${p}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="number"
            name="mileageFrom"
            placeholder="From"
            value={filters.mileageFrom}
            onChange={handleChange}
            className={styles.mileageInput}
            min="0"
          />
          <input
            type="number"
            name="mileageTo"
            placeholder="To"
            value={filters.mileageTo}
            onChange={handleChange}
            className={styles.mileageInput}
            min="0"
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default Filters;
