import { createSlice } from '@reduxjs/toolkit';

const calculateCartTotalAmount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + (cartItem.price * cartItem.cartQuantity);
  }, 0);
};

const initialState = {
  cartItems: localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: calculateCartTotalAmount(localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) : []),
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (productIndex >= 0) {
          // Item already exists in the cart
          state.cartItems[productIndex].cartQuantity += action.payload.cartQuantity;
        } else {
          // Item does not exist in the cart, add it
          const tempProduct = { ...action.payload, cartQuantity: action.payload.cartQuantity };
          state.cartItems.push(tempProduct);
        }
        // Update total amount
        state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      }
      // Update total amount
      state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      // Update total amount
      state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY(state) {
      state.cartTotalQuantity = state.cartItems.reduce((total, cartItem) => {
        return total + cartItem.cartQuantity;
      }, 0);
    },
  }
});

export const { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, 
  CLEAR_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
