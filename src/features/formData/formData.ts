import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  tc: boolean;
  picture: string | null;
  country: string;
}

const initialState: FormData = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  tc: false,
  picture: null,
  country: '',
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    formDataUpdate(_, action: PayloadAction<FormData>) {
      return action.payload;
    },
  },
});

export const { formDataUpdate } = formDataSlice.actions;
export default formDataSlice.reducer;
