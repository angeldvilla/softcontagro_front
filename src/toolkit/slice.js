// softcontagroSlice.js

import { createSlice } from '@reduxjs/toolkit';

const softcontagroSlice = createSlice({
  name: 'softcontagro',
  initialState: {
    products: [],
    sales: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    addSale: (state, action) => {
      state.sales.push(action.payload);
    },
  },
});

export const { addProduct, addSale } = softcontagroSlice.actions;
export default softcontagroSlice.reducer;
