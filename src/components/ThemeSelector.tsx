import React from 'react';
import { useTheme } from '../contexts/useTheme';
import './ThemeSelector.css';

const ThemeSelector: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={handleToggle}
      />
      <span className="slider" />
    </label>
  );
};

export default ThemeSelector;
