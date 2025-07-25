import { Helmet } from "react-helmet";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Car Rental Service - Rent Your Perfect Ride</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Best car rental service. Wide selection of vehicles, easy booking, and affordable prices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Car Rental Service - Rent Your Perfect Ride"
        />
        <meta
          property="og:description"
          content="Best car rental service. Wide selection of vehicles, easy booking, and affordable prices."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/car-og-image.jpg"
        />
      </Helmet>

      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
