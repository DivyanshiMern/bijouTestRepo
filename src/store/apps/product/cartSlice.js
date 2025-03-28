import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(sessionStorage.getItem('shoppingBag')) || [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      sessionStorage.setItem('shoppingBag', JSON.stringify(state.items));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
        state.items[existingItemIndex].total = state.items[existingItemIndex].price * state.items[existingItemIndex].quantity;
      } else {
        state.items.push({ ...newItem, quantity: 1, total: newItem.price });
      }
      sessionStorage.setItem('shoppingBag', JSON.stringify(state.items));
    },
    updateCartItem: (state, action) => {
      const { index, quantity } = action.payload;
      if (quantity > 0) {
        state.items[index].quantity = quantity;
        state.items[index].total = state.items[index].price * quantity;
      }
      sessionStorage.setItem('shoppingBag', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.items.splice(index, 1);
      if (state.items.length === 0) {
        sessionStorage.removeItem('shoppingBag');
      } else {
        sessionStorage.setItem('shoppingBag', JSON.stringify(state.items));
      }
    },
  },
});

export const { setCartItems, addToCart, updateCartItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;