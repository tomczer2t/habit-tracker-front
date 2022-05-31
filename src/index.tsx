import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { HabitsProvider } from './context/HabitsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HabitsProvider>
      <App />
    </HabitsProvider>
  </React.StrictMode>
);
