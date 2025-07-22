import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { formatKM } from "../../utils/formatKM";

import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(car.id);

  if (!car) return null;

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

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
        <button
          className={styles.favoriteBtn}
          onClick={() => dispatch(toggleFavorite(id))}
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
          {line1.map((item, idx) => (
            <li key={idx}>
              {item}
              {idx < line1.length - 1 && <span className={styles.dot}>|</span>}
            </li>
          ))}
        </ul>

        <ul className={styles.details}>
          {line2.map((item, idx) => (
            <li key={idx}>
              {item}
              {idx < line2.length - 1 && <span className={styles.dot}>|</span>}
            </li>
          ))}
        </ul>

        <Link to={`/catalog/${id}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
