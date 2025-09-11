import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import rootStore from './Store/rootStore.tsx';
createRoot(document.getElementById('root')!).render(
  <div className="asd">
    <StrictMode>
      <BrowserRouter>
        <Provider rootStore={rootStore}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </div>
);
