import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './Context/ThemeSaveContext.tsx';
createRoot(document.getElementById('root')!).render(
  <div className="asd">
    <StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </StrictMode>
  </div>
);
