import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { formDataUpdate } from '../features/formData/formData';
import './form.css';
import { RootState } from '../app/store';

const UncontrolledComponentsForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const countries = useSelector((state: RootState) => state.countries);

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
    picture: Yup.mixed()
      .test('fileSize', 'File size is too large', (value) => {
        return value && value instanceof File && value.size <= 2000000;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        return (
          value &&
          value instanceof File &&
          ['image/jpeg', 'image/png'].includes(value.type)
        );
      })
      .required('Picture is required'),
    country: Yup.string().required('Country is required'),
  });

  const validateForm = async () => {
    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value as 'male' | 'female',
      tc: tcRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors: Record<string, string> = {};
      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) formattedErrors[error.path] = error.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    setIsSubmitting(true);

    const isValid = await validateForm();

    if (isValid) {
      const formData = {
        name: nameRef.current?.value || '',
        age: parseInt(ageRef.current?.value || '0', 10),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        confirmPassword: confirmPasswordRef.current?.value || '',
        gender: genderRef.current?.value as 'male' | 'female',
        tc: tcRef.current?.checked || false,
        picture: pictureRef.current?.files?.[0] || null,
        country: countryRef.current?.value || '',
      };

      if (formData.picture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const pictureBase64 = reader.result as string;
          dispatch(formDataUpdate({ ...formData, picture: pictureBase64 }));
          navigate('/', { state: { newData: true } });
        };
        reader.readAsDataURL(formData.picture);
      } else {
        dispatch(formDataUpdate({ ...formData, picture: null }));
        navigate('/', { state: { newData: true } });
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = async () => {
    if (!isFirstSubmit) {
      await validateForm();
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          ref={nameRef}
          onChange={handleChange}
          autoComplete="name"
        />
        {!isFirstSubmit && errors.name && (
          <div className="error">{errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          ref={ageRef}
          onChange={handleChange}
          autoComplete="bday"
        />
        {!isFirstSubmit && errors.age && (
          <div className="error">{errors.age}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          ref={emailRef}
          onChange={handleChange}
          autoComplete="email"
        />
        {!isFirstSubmit && errors.email && (
          <div className="error">{errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {!isFirstSubmit && errors.password && (
          <div className="error">{errors.password}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {!isFirstSubmit && errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          ref={genderRef}
          onChange={handleChange}
          autoComplete="sex"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {!isFirstSubmit && errors.gender && (
          <div className="error">{errors.gender}</div>
        )}
      </div>

      <div>
        <label htmlFor="tc">Accept Terms and Conditions:</label>
        <input
          id="tc"
          name="tc"
          type="checkbox"
          ref={tcRef}
          onChange={handleChange}
          autoComplete="off"
        />
        {!isFirstSubmit && errors.tc && (
          <div className="error">{errors.tc}</div>
        )}
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          name="picture"
          type="file"
          ref={pictureRef}
          accept="image/jpeg, image/png"
          onChange={handleChange}
          autoComplete="off"
        />
        {!isFirstSubmit && errors.picture && (
          <div className="error">{errors.picture}</div>
        )}
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          name="country"
          type="text"
          ref={countryRef}
          list="country-options"
          onChange={handleChange}
          autoComplete="country"
        />
        <datalist id="country-options">
          {countries.map((country: string) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {!isFirstSubmit && errors.country && (
          <div className="error">{errors.country}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={
          isSubmitting || (!isFirstSubmit && Object.keys(errors).length > 0)
        }
      >
        Submit
      </button>
    </form>
  );
};

export default UncontrolledComponentsForm;
