import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/cars/carsSlice";
import { formatKM } from "../../utils/formatKM";

import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cars.favorites);

  if (!car || !car.address) return null;

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    mileage,
    rentalCompany,
    address,
    type,
  } = car;

  const city = address.split(",")[1]?.trim() || "Location";
  const country = address.split(",")[2]?.trim() || "";
  const line1 = [city, country, rentalCompany];
  const line2 = [type, `${formatKM(mileage)} km`];

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
        <button
          className={styles.favoriteBtn}
          onClick={toggleFavorite}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {brand} <span className={styles.model}>{model}</span>, {year}
          </h3>
          <span className={styles.price}>${rentalPrice}</span>
        </div>

        <ul className={styles.details}>
          {line1
            .map((item) => (
              <li key={item}>
                {item}
                <span className={styles.dot}>|</span>
              </li>
            ))
            .slice(0, -1)}
          <li key={line1[line1.length - 1]}>{line1[line1.length - 1]}</li>
        </ul>

        <ul className={styles.details}>
          {line2
            .map((item) => (
              <li key={item}>
                {item}
                <span className={styles.dot}>|</span>
              </li>
            ))
            .slice(0, -1)}
          <li key={line2[line2.length - 1]}>{line2[line2.length - 1]}</li>
        </ul>

        <Link to={`/catalog/${id}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
