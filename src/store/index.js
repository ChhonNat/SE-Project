import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authentication/authenticationSlice';

const store = configureStore({
  reducer: { userAuthendicated: authenticationSlice.reducer },
});

export default store;
