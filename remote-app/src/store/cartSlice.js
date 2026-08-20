import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'prod-1',
      name: 'CyberPulse Wireless ANC Headphones',
      price: 249.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      category: 'Audio',
      rating: 4.9,
      badge: 'Best Seller'
    },
    {
      id: 'prod-3',
      name: 'Quantum Edge Smartwatch Ultra',
      price: 329.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      category: 'Wearables',
      rating: 4.8,
      badge: 'Trending'
    }
  ],
  couponCode: '',
  discountPercent: 0,
  couponError: '',
  couponSuccess: ''
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += (product.quantity || 1);
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    applyCoupon: (state, action) => {
      const code = action.payload ? action.payload.trim().toUpperCase() : '';
      if (!code) {
        state.couponError = 'Please enter a coupon code';
        state.couponSuccess = '';
        return;
      }

      if (code === 'SAVE10') {
        state.couponCode = 'SAVE10';
        state.discountPercent = 10;
        state.couponSuccess = '10% Discount Applied!';
        state.couponError = '';
      } else if (code === 'TECH20') {
        state.couponCode = 'TECH20';
        state.discountPercent = 20;
        state.couponSuccess = '20% Tech Discount Applied!';
        state.couponError = '';
      } else if (code === 'SUPER50') {
        state.couponCode = 'SUPER50';
        state.discountPercent = 50;
        state.couponSuccess = '50% Mega Discount Applied!';
        state.couponError = '';
      } else {
        state.couponError = 'Invalid Coupon Code. Try SAVE10, TECH20, or SUPER50';
        state.couponSuccess = '';
      }
    },
    removeCoupon: (state) => {
      state.couponCode = '';
      state.discountPercent = 0;
      state.couponError = '';
      state.couponSuccess = '';
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = '';
      state.discountPercent = 0;
      state.couponError = '';
      state.couponSuccess = '';
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
