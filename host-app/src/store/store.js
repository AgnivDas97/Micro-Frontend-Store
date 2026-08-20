import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../remote-app/src/store/cartSlice.js';
import ordersReducer from './ordersSlice.js';
import productsReducer from './productsSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
