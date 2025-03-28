import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    const loginToken = sessionStorage.getItem('Authorization');

    if (!loginToken) {
      toast.error('No token found. Please login again.');
      return rejectWithValue('No token found');
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_HOST}/api/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log("==response==",response);
      
      return response.data.data;
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || 'Failed to fetch user profile. Please try again.';
      toast.error(errorMessage);
      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  },
);

export const deleteUser = createAsyncThunk(
  'profile/deleteUser',
  async ({ id }, { rejectWithValue }) => {
    const token = sessionStorage.getItem('authorization');
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_HOST}/api/v1/users/delete_user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response.data.message;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'User Delete failed!');
      return rejectWithValue(error.response.data);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userDetail: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload || 'User Deleted Successfully.');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || 'User Delete failed!');
      });
  },
});

export default profileSlice.reducer;
