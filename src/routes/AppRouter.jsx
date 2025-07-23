import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import CarDetailsPage from "../pages/CarDetailsPage";
import FavoritesPage from "../pages/FavoritesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CarDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default AppRouter;
