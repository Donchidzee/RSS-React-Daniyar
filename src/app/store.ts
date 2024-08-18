import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../features/formData/formData';
import countryReducer from '../features/countrySlice/countrySlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
