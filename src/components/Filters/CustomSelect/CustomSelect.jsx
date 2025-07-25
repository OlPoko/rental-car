import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Choose",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.fieldGroup} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.selectWrapper} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={styles.selectedValue}>{value || placeholder}</div>
        <div className={styles.arrow} />
        {open && (
          <ul className={styles.optionsList}>
            {options.map((option) => (
              <li
                key={option}
                className={`${styles.option} ${
                  value === option ? styles.optionSelected : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
