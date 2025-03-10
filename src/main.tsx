import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './index.css';
import './satoshi.css'
import App from './app/App';
import { UserRoleProvider } from './core/utils/UserRoleContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserRoleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserRoleProvider>
  </StrictMode>
);
