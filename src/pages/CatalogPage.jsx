import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, resetCars } from "../redux/cars/carsSlice";
import { setFilters } from "../redux/filters/filtersSlice";

import CarCard from "../components/CarCard/CarCard";
import Filters from "../components/Filters/Filters";
import CarCardSkeleton from "../components/CarCardSkeleton/CarCardSkeleton";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const { items, isLoading, hasMore, currentPage, error } = useSelector(
    (state) => state.cars
  );

  const filters = useSelector((state) => state.filters);

  const didLoadOnce = useRef(false);

  useEffect(() => {
    if (!didLoadOnce.current) {
      dispatch(resetCars());
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

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchCars({ ...filters, page: nextPage, limit: 12 }));
  };

  // ✅ ЛОКАЛЬНА ФІЛЬТРАЦІЯ ПРОБІГУ
  const filteredCars = items.filter((car) => {
    const mileageFrom =
      filters.mileageFrom !== "" ? Number(filters.mileageFrom) : 0;
    const mileageTo =
      filters.mileageTo !== "" ? Number(filters.mileageTo) : Infinity;

    if (isNaN(mileageFrom) || isNaN(mileageTo)) return true;

    return car.mileage >= mileageFrom && car.mileage <= mileageTo;
  });

  // ✅ Додаткове логування
  console.log("🔍 Фільтри:", filters);
  console.log("🚗 Отримано машин:", items.length);
  console.log("✅ Після фільтрації:", filteredCars.length);

  return (
    <div className={styles.catalogWrapper}>
      <Filters onApply={handleApplyFilters} />

      <div className={styles.grid}>
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))
        ) : filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className={styles.noResults}>
            No cars found for selected mileage range.
          </p>
        )}
      </div>

      {error && <p className={styles.error}>Error: {error}</p>}

      {filteredCars.length > 0 && hasMore && !isLoading && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
