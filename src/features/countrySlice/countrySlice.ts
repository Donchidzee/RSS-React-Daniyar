import { createSlice } from '@reduxjs/toolkit';

const countries = [
  'United States',
  'Canada',
  'Mexico',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
];

const countrySlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export default countrySlice.reducer;
