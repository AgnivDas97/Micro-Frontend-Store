import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'ORD-98421',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        {
          id: 'prod-2',
          name: 'Apex Pro Mechanical Gaming Keyboard',
          price: 179.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80'
        }
      ],
      totalAmount: 184.39,
      status: 'Delivered',
      shippingAddress: {
        fullName: 'Alex Johnson',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        zip: '97477',
        paymentMethod: 'Credit Card (**** 4242)'
      }
    }
  ]
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    }
  }
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
