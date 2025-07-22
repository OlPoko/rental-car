// src/redux/cars/carsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk: отримує авто з урахуванням фільтрів + сторінки
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params = {}, thunkAPI) => {
    console.log("=== FETCH CARS STARTED ===", params);

    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );
      const { cars, totalPages } = response.data;
      console.log("✅ FETCH CARS SUCCESS:", cars.length, "cars");
      return { cars, totalPages };
    } catch (error) {
      console.error("❌ FETCH CARS ERROR:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 0,
    hasMore: true,
  },
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.totalPages = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, totalPages } = action.payload;
        const fetchedPage = action.meta.arg.page;

        state.items = [...state.items, ...cars];
        state.currentPage = fetchedPage;
        state.totalPages = totalPages;
        state.hasMore = fetchedPage < totalPages;
        state.isLoading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
