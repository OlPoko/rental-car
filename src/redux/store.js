import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import filtersReducer from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
  },
});
