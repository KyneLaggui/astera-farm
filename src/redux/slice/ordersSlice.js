import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    topProducts: [] // New state to store top 3 products by quantity
}

const ordersSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        SET_ORDERS: (state, action) => {
            state.orders = action.payload;

            const productMap = {};

            // Loop through each order and accumulate quantities per product
            action.payload.forEach(order => {
                order.cart.forEach(product => {
                    if (productMap[product.name]) {
                        productMap[product.name].quantity += product.quantity;
                    } else {
                        productMap[product.name] = { ...product };
                    }
                });
            });

            // Convert product map to array and sort by quantity in descending order
            const sortedProducts = Object.values(productMap).sort((a, b) => b.quantity - a.quantity);

            // Set top 3 products in state
            state.topProducts = sortedProducts.slice(0, 3);
        }
    },
})

export const { SET_ORDERS } = ordersSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectTopProducts = (state) => state.order.topProducts;

export default ordersSlice.reducer;
