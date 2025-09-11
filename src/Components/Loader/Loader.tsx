// Components/Loader/Loader.tsx
import React from 'react';
import { inject, observer } from 'mobx-react';
import type { RootStore } from '../../Store/rootStore';
import './Loader.css';

interface Props {
  rootStore?: RootStore;
}

// eslint-disable-next-line react-refresh/only-export-components
const Loader: React.FC<Props> = ({ rootStore }) => {
  const theme = rootStore?.themeStore.theme ?? 'light';

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
export default inject('rootStore')(observer(Loader));
