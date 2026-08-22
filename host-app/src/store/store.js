import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../remote-app/src/store/cartSlice.js';
import authReducer from '../../../auth-app/src/store/authSlice.js';
import ordersReducer from './ordersSlice.js';
import productsReducer from './productsSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
});

export default store;
