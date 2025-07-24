import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // 🔹 Заборона скролу при відкритому меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          Rental<span>Car</span>
        </NavLink>

        <nav className={`${styles.nav} ${menuOpen ? styles.openNav : ""}`}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Catalog
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={styles.navLink}
          >
            Favorites
          </NavLink>
        </nav>

        <button className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* 🔹 Бекдроп */}
        {menuOpen && (
          <div className={styles.backdrop} onClick={closeMenu}></div>
        )}
      </div>
    </header>
  );
};

export default Header;
