// src/components/Filters/Filters.jsx
import { useState } from "react";
import styles from "./Filters.module.css";
import { toast } from "react-toastify";

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

    const from = filters.mileageFrom.trim();
    const to = filters.mileageTo.trim();

    const cleaned = {
      ...filters,
      mileageFrom: from === "" ? "" : Number(from),
      mileageTo: to === "" ? "" : Number(to),
    };

    if (
      (cleaned.mileageFrom !== "" && isNaN(cleaned.mileageFrom)) ||
      (cleaned.mileageTo !== "" && isNaN(cleaned.mileageTo))
    ) {
      toast.error("Mileage must be a number");
      return;
    }

    if (
      (cleaned.mileageFrom !== "" && cleaned.mileageFrom < 0) ||
      (cleaned.mileageTo !== "" && cleaned.mileageTo < 0)
    ) {
      toast.error("Mileage cannot be negative");
      return;
    }

    onApply(cleaned);
  };

  const handleReset = () => {
    const initialState = {
      brand: "",
      rentalPrice: "",
      mileageFrom: "",
      mileageTo: "",
    };

    setFilters(initialState);
    onApply(initialState);
    toast.info("Filters have been reset", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Car brand</label>
        <select
          name="brand"
          value={filters.brand}
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

      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Search
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Filters;
