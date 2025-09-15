// Components/Loader/Loader.tsx
import React from 'react';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';
import './Loader.css';

interface Props {
  rootAppStore?: RootAppStore;
}

// eslint-disable-next-line react-refresh/only-export-components
const Loader: React.FC<Props> = ({ rootAppStore }) => {
  const theme = rootAppStore?.themeStore.theme ?? 'light';

  return (
    <div
      data-testid="loader"
      className={`loader-container ${theme === 'dark' ? 'dark' : 'light'}`}
    >
      <div className="spinner"></div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(Loader));
