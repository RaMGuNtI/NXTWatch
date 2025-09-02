import React, { useContext } from 'react';
import { AppContext } from '../../Context/ThemeSaveContext';
import './Loader.css';

const Loader: React.FC = () => {
  const ctx = useContext(AppContext);
  const theme = ctx?.theme || 'light';

  return (
    <div className={`loader-container ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
