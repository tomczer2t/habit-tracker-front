import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { HabitsProvider } from './context/HabitsProvider';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HabitsProvider>
        <App />
      </HabitsProvider>
    </AuthProvider>
  </React.StrictMode>
);
