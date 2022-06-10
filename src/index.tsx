import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { HabitsProvider } from './context/HabitsProvider';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <HabitsProvider>
          <DndProvider backend={ HTML5Backend }>
            <App />
          </DndProvider>
        </HabitsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
