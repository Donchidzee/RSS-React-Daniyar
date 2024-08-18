export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  tc: boolean;
  picture: File | null;
  country: string;
}
