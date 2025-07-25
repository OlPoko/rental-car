import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Filters.module.css";
import CustomSelect from "./CustomSelect/CustomSelect"; // або вкажи правильний шлях

const brands = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "GMC",
  "Hummer",
  "Subaru",
  "Volvo",
];

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
      <CustomSelect
        label="Car brand"
        options={brands}
        value={filters.brand}
        onChange={(val) => setFilters((prev) => ({ ...prev, brand: val }))}
        placeholder="Choose a brand"
      />

      <CustomSelect
        label="Price / 1 hour"
        options={prices.map((p) => `To $${p}`)}
        value={filters.rentalPrice ? `To $${filters.rentalPrice}` : ""}
        onChange={(val) => {
          const number = val.replace(/\D/g, "");
          setFilters((prev) => ({ ...prev, rentalPrice: number }));
        }}
        placeholder="Choose a price"
      />

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
