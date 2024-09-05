import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

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
                state.products[index] = updatedProduct;
            }
        }
    },
})

export const { SET_PRODUCTS, UPDATE_PRODUCT, ADD_PRODUCT } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
