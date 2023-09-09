// store.js

import { configureStore } from '@reduxjs/toolkit';
import softcontagroReducer from '../features/softcontagro/softcontagroSlice';

const store = configureStore({
  reducer: {
    softcontagro: softcontagroReducer,
  },
});

export default store;
