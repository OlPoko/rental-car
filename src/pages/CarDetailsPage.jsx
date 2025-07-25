import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarById } from "../redux/cars/carsSlice";
import { useEffect } from "react";
import BookingForm from "../components/BookingForm/BookingForm";
import { formatKM } from "../utils/formatKM";
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector((state) => state.cars.selectedCar);
  const isLoading = useSelector((state) => state.cars.isLoading);
  const error = useSelector((state) => state.cars.error);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <main className={styles.detailsWrapper}>
      <section className={styles.topSection}>
        <div>
          <img className={styles.image} src={car.img} alt={car.make} />
          <div className={styles.booking}>
            <BookingForm
              carName={`${car.make} ${car.model}`}
              withTitle={false}
            />
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.title}>
            {car.brand} {car.model}, {car.year}
            <span className={styles.carId}>ID: {car.id}</span>
          </h2>
          <p className={styles.location}>
            📍 {car.address} &nbsp;&nbsp;&nbsp; Mileage: {formatKM(car.mileage)}{" "}
            km
          </p>
          <p className={styles.price}>
            <span className={styles.dollar}>$</span>
            {car.rentalPrice}
          </p>

          <p className={styles.description}>{car.description}</p>

          <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>✔️ Minimum age: 25</li>
            <li className={styles.listItem}>✔️ Security deposite required</li>
            <li className={styles.listItem}>✔️ Valid driver’s license</li>
          </ul>

          <h3 className={styles.sectionTitle}>Car Specifications:</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>📅 Year: {car.year}</li>
            <li className={styles.listItem}>🚘 Type: {car.type}</li>
            <li className={styles.listItem}>
              ⛽ Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={styles.listItem}>
              ⚙️ Engine Size: {car.engineSize}
            </li>
          </ul>

          <h3 className={styles.sectionTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={styles.list}>
            {car.accessories.map((acc) => (
              <li key={acc} className={styles.listItem}>
                ✔️ {acc}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default CarDetailsPage;
