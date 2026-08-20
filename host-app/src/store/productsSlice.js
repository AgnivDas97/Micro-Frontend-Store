import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products from DummyJSON API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category = 'All', search = '' } = {}) => {
    let url = 'https://dummyjson.com/products?limit=30';
    if (search && search.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`;
    } else if (category && category !== 'All') {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category.toLowerCase())}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products from API');
    }
    const data = await response.json();
    return data.products;
  }
);

// Async thunk to fetch categories list from DummyJSON API
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    // Normalize string array or category objects
    return data.map((c) => (typeof c === 'string' ? c : c.name || c.slug));
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedCategory: 'All',
    searchQuery: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { setSelectedCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
