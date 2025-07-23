import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard/CarCard";
import { clearFavorites } from "../redux/cars/carsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.cars.favorites);
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    toast.info("Favorites cleared!");
  };
  console.log("favorites:", favorites);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites yet.</p>
      ) : (
        <>
          <button onClick={handleClearFavorites} className={styles.clearBtn}>
            Clear all favorites
          </button>

          <ul className={styles.list}>
            {favorites.map((car) => (
              <li key={car.id} className={styles.cardItem}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
