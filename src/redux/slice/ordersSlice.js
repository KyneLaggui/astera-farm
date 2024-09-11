import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: []
}

const ordersSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        SET_ORDERS: (state, action) => {
            state.orders = action.payload;
        }
    },
})

export const { SET_ORDERS } = ordersSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default ordersSlice.reducer;