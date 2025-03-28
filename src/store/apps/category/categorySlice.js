import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = `${import.meta.env.VITE_APP_HOST}`;

export const getCategoryList = createAsyncThunk(
  "category/get_category_list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/v1/category/get_categories`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Store full nested data
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;