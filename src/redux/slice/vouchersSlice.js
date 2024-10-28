import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    vouchers: []
};

const vouchersSlice = createSlice({
    name: "vouchers",
    initialState,
    reducers: {
        SET_VOUCHERS: (state, action) => {
            console.log(action.payload.vouchers);
            console.log('okay');
            state.vouchers = action.payload.vouchers;
        },
        ADD_VOUCHER: (state, action) => {
            state.vouchers = [...state.vouchers, action.payload.voucher];
        },
        UPDATE_VOUCHER: (state, action) => {
            const updatedVoucher = action.payload;
            const index = state.vouchers.findIndex(voucher => voucher.id === updatedVoucher.id);
            if (index !== -1) {
                // Merge existing voucher with updated properties
                state.vouchers[index] = { 
                    ...state.vouchers[index], 
                    ...updatedVoucher 
                };
            }
        },
        DELETE_VOUCHER: (state, action) => {
            const idToDelete = action.payload.id;
            state.vouchers = state.vouchers.filter(voucher => voucher.id !== idToDelete);
        }
    },
});

export const { SET_VOUCHERS, ADD_VOUCHER, UPDATE_VOUCHER, DELETE_VOUCHER } = vouchersSlice.actions;

export const selectVouchers = (state) => state.vouchers.vouchers;

export default vouchersSlice.reducer;
