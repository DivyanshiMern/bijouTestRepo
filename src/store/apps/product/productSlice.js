import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_ENDPOINT = `${import.meta.env.VITE_APP_HOST}`;

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get_product_by_CategoryId?categoryId=${categoryId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const getProductBySubCategory = createAsyncThunk(
  "product/get_product_by_subCategoryId",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get_product_by_subCategoryId?subcategoryId=${subcategoryId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const getProductDetailsById = createAsyncThunk(
  "product/getProductDetailById",
  async (uniqueProductId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get_product_by_id?productId=${uniqueProductId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const getProductsBySearchFilters = createAsyncThunk(
  "product/getProductsBySearchFilters",
  async ({ type, id }, { rejectWithValue }) => {
    try {
      const queryParam =
        type === "category"
          ? `categoryId=${id}`
          : type === "subcategory"
          ? `subCategoryId=${id}`
          : type === "material"
          ? `materialId=${id}`
          : "";

      const response = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get_search_products?${queryParam}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products dynamically by search filters
      .addCase(getProductsBySearchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsBySearchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsBySearchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get products by subcategory
      .addCase(getProductBySubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductBySubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductBySubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get product details by ID
      .addCase(getProductDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
