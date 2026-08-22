import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('mfe_auth_user')) || {
  id: 'usr_101',
  name: 'Alex Mercer',
  email: 'alex.mercer@neostore.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  role: 'PRO Developer',
  membershipTier: 'VIP Platinum',
};

const initialState = {
  user: localStorage.getItem('mfe_auth_token') ? initialUser : null,
  isAuthenticated: !!localStorage.getItem('mfe_auth_token'),
  token: localStorage.getItem('mfe_auth_token') || null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token || 'mfe_jwt_token_sample_9921';
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('mfe_auth_token', state.token);
      localStorage.setItem('mfe_auth_user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('mfe_auth_token');
      localStorage.removeItem('mfe_auth_user');
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('mfe_auth_user', JSON.stringify(state.user));
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, updateUserProfile, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
