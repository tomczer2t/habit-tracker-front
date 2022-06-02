import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { HabitsProvider } from './context/HabitsProvider';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <HabitsProvider>
          <App />
        </HabitsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
