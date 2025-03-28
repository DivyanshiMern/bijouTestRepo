import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./apps/category/categorySlice";
import productSlice from "./apps/product/productSlice";
import registerReducer from "./apps/user/userSlice";
import cartReducer from "./apps/product/cartSlice";
import orderReducer from "./apps/order/orderSlice";
import userProfileReducer from "./apps/user/profileSlice";
import appointmentReducer from "./apps/bookAppointment/bookAppointmentSlice";
export const store = configureStore({
  reducer: {
    category: categorySlice,
    products: productSlice,
    userList: registerReducer,
    cart: cartReducer,
    order: orderReducer,
    profile: userProfileReducer,
    appointment: appointmentReducer,
  },
});
export default store;
