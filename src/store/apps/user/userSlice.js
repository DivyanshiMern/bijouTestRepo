import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_APP_HOST}/api/v1/auth/login/success`;
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || { message: error.message, code: error.code };
    console.error('Error in fetchUser thunk:', errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const guestLogin = createAsyncThunk(
  'user/guestLogin',
  async (formData, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_APP_HOST}/api/v1/users/guest_login`;
      const response = await axios.post(url, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data || { message: error.message, code: error.code };
      console.error('Error in guestLogin thunk:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_HOST}/api/v1/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  await dispatch(logoutUser());
  sessionStorage.clear();
  return; 
});

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    const loginToken = sessionStorage.getItem('authorization');

    if (!loginToken) {
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
      return response.data.data;
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || 'Failed to fetch user profile. Please try again.';
      return rejectWithValue(error.response?.data || { message: errorMessage });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
    isLoggedOut: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.login_token;
        state.status = 'succeeded';
        state.isLoggedOut = false;
        console.log('User data fetched and stored:', action.payload);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(guestLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(guestLogin.fulfilled, (state, action) => {
        state.user = action.payload.newUser || null;
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.isLoggedOut = false;
      })
      .addCase(guestLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedOut = true;
        state.status = 'idle';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Logout failed:', action.payload);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;