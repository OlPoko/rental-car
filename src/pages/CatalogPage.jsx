import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, resetCars } from "../redux/cars/carsSlice";
import { setFilters } from "../redux/filters/filtersSlice";

import CarCard from "../components/CarCard/CarCard";
import Filters from "../components/Filters/Filters";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  console.log("❗ CatalogPage component loaded");
  const dispatch = useDispatch();

  const { items, isLoading, hasMore, currentPage, error } = useSelector(
    (state) => state.cars
  );

  const filters = useSelector((state) => state.filters);

  const didLoadOnce = useRef(false);

  useEffect(() => {
    if (!didLoadOnce.current) {
      dispatch(fetchCars({ ...filters, page: 1, limit: 12 }));
      didLoadOnce.current = true;
    }
  }, [dispatch, filters]);

  const handleApplyFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(resetCars());
    dispatch(fetchCars({ ...newFilters, page: 1, limit: 12 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Load More
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchCars({ ...filters, page: nextPage, limit: 12 }));
  };

  return (
    <div className={styles.catalogWrapper}>
      <Filters onApply={handleApplyFilters} />

      <div className={styles.grid}>
        {items.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {isLoading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {items.length > 0 && hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
