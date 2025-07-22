import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (data) => {
  localStorage.setItem("favorites", JSON.stringify(data));
};

const initialState = loadFromStorage();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(id);
      }
      saveToStorage(state);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
