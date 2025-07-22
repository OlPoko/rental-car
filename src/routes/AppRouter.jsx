import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import CarDetailsPage from "../pages/CarDetailsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CarDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
