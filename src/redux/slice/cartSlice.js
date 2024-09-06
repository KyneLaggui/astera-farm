import { createSlice } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    // previousURL: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        console.log(state.cartItems)
        if (productIndex >= 0) {
          // Item already exists in the cart
          // Increase the cartQuantity
          state.cartItems[productIndex].cartQuantity += action.payload.cartQuantity;
          // toast.info(`${action.payload.name} cart quantity increased by 1`, {position: "top-left"});
        } else {
          // Item does not exist in the cart
          // Add item to the cart
          const tempProduct = {...action.payload, cartQuantity: action.payload.cartQuantity};
          state.cartItems.push(tempProduct);
        //   toast.success(`${action.payload.name} added to cart`, {position: "top-left"});
        }
        // Save cart to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        // toast.info(`${action.payload.name} cart quantity decreased by 1`, {position: "top-left"});
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
          const newCartItem = state.cartItems.filter((cartItem) => {
          return cartItem.id !== action.payload.id;
        })
        state.cartItems = newCartItem;
        // toast.success(`${action.payload.name} removed from cart`, {position: "top-left"});
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter((cartItem) => {
        return cartItem.id !== action.payload.id;
      })
      state.cartItems = newCartItem;
    //   toast.success(`${action.payload.name} removed from cart`, {position: "top-left"});
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared successfully`, {position: "top-left"});
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state) {
      const array = [];
      state.cartItems.map((cartItem) => {
        const {price, cartQuantity} = cartItem; 
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state) {
      const array = [];
      state.cartItems.map((cartItem) => {
        const {cartQuantity} = cartItem; 
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  }
});

export const { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, 
  CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
// export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;