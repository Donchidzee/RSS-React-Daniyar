import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formDataUpdate } from '../features/formData/formData';
import { RootState } from '../app/store';
import './form.css';

interface FormData {
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

interface ValidationFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  tc: boolean;
  picture: File;
  country: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Gender is required')
    .required('Gender is required'),
  tc: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  picture: Yup.mixed<File>().required('Picture is required'),
  country: Yup.string().required('Country is required'),
});

const ReactHookForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const countries = useSelector((state: RootState) => state.countries);

  const onSubmit = async (data: ValidationFormData) => {
    const file = data.picture;

    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const pictureBase64 = reader.result as string;

        const finalData: FormData = {
          ...data,
          picture: pictureBase64,
        };

        dispatch(formDataUpdate(finalData));
        navigate('/', { state: { newData: true } });
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No valid file provided for picture.');
      dispatch(formDataUpdate({ ...data, picture: null }));
      navigate('/', { state: { newData: true } });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} autoComplete="name" />
        {errors.name && <div className="error">{errors.name.message}</div>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register('age')}
          autoComplete="bday"
        />
        {errors.age && <div className="error">{errors.age.message}</div>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="email"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')} autoComplete="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <div className="error">{errors.gender.message}</div>}
      </div>

      <div>
        <label htmlFor="tc">Accept Terms and Conditions:</label>
        <input id="tc" type="checkbox" {...register('tc')} autoComplete="off" />
        {errors.tc && <div className="error">{errors.tc.message}</div>}
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          type="file"
          {...register('picture')}
          accept="image/jpeg, image/png"
          autoComplete="off"
        />
        {errors.picture && (
          <div className="error">{errors.picture.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          {...register('country')}
          list="country-options"
          autoComplete="country"
        />
        <datalist id="country-options">
          {countries.map((country: string) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <div className="error">{errors.country.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
