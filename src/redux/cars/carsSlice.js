import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Завантаження всіх авто з фільтрами
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

// 🔹 Завантаження одного авто по ID
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    console.log("=== FETCH CAR BY ID STARTED ===", id);

    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars/${id}`
      );
      console.log("✅ FETCH CAR BY ID SUCCESS:", response.data.id);
      return response.data;
    } catch (error) {
      console.error("❌ FETCH CAR BY ID ERROR:", error.message);
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
    isLoadingMore: false,

    // 🔹 Стан для сторінки деталей авто
    selectedCar: null,
    selectedCarLoading: false,
    selectedCarError: null,
  },
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.totalPages = 1;
      state.hasMore = true;
    },
    clearSelectedCar: (state) => {
      state.selectedCar = null;
      state.selectedCarError = null;
      state.selectedCarLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔸 Обробка fetchCars
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
      })

      // 🔸 Обробка fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.selectedCar = null;
        state.selectedCarLoading = true;
        state.selectedCarError = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
        state.selectedCarLoading = false;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.selectedCar = null;
        state.selectedCarLoading = false;
        state.selectedCarError = action.payload;
      });
  },
});

export const { resetCars, clearSelectedCar } = carsSlice.actions;
export default carsSlice.reducer;
