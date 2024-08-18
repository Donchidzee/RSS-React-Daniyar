import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  const formData = useSelector((state: RootState) => state.formData);
  const location = useLocation();
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (location.state && location.state.newData) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="app">
      <Link to={'/uncontrolled-components-form'}>
        Uncontrolled Components Form
      </Link>
      <Link to={'/react-hook-form'}>React Hook Form</Link>
      <h1>Form Data:</h1>
      <div className={`container ${highlight ? 'highlight' : ''}`}>
        <p>Name: {formData.name}</p>
        <p>Age: {formData.age}</p>
        <p>Email: {formData.email}</p>
        <p>Gender: {formData.gender}</p>
        <p>Country: {formData.country}</p>
        <p>Accepted Terms: {formData.tc ? 'Yes' : 'No'}</p>
        <p>Picture:</p>
        {formData.picture && <img src={formData.picture} alt="User uploaded" />}
      </div>
    </div>
  );
};

export default App;
