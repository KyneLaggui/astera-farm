import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: []
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        SET_PRODUCTS: (state, action) => {
            state.products = action.payload.products;
        },
        ADD_PRODUCT: (state, action) => {
            state.products = [...state.products, action.payload.product];
        },
        UPDATE_PRODUCT: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                // Merge existing product with updated properties
                state.products[index] = { 
                    ...state.products[index], 
                    ...updatedProduct 
                };
            }
        },
        DELETE_PRODUCT: (state, action) => {
            const idToDelete = action.payload.id;
            state.products = state.products.filter(product => product.id !== idToDelete);
        }
    },
});

export const { SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
