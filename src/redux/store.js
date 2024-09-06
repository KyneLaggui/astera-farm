import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store;