import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_ENDPOINT = `${import.meta.env.VITE_APP_HOST}`;
const token = sessionStorage.getItem("Authorization");

export const createAppointment = createAsyncThunk(
  "bookAppointment/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api/v1/bookAppointment/createAppointment`,
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Appointment booked successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to book appointment. Try again!";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// export const getAllAppointments = createAsyncThunk(
//   "bookAppointment/getAllAppointments",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_ENDPOINT}/api/v1/appointments`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch appointments"
//       );
//     }
//   }
// );

const bookAppointmentSlice = createSlice({
  name: "bookAppointment",
  initialState: {
    appointment: null,
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Appointments
    //   .addCase(getAllAppointments.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getAllAppointments.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.appointments = action.payload;
    //   })
    //   .addCase(getAllAppointments.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default bookAppointmentSlice.reducer;
