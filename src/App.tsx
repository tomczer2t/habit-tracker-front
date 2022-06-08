import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Auth } from './components/Auth/Auth';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Habits } from './components/Habits/Habits';
import { HabitView } from './views/HabitView/HabitView';
import { AddHabitVIew } from './views/AddHabitView/AddHabitVIew';
import { SettingsView } from './views/SettingsView/SettingsView';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <MainLayout /> }>
          <Route path="/login" element={ <Auth /> } />
          <Route path="/register" element={ <Auth /> } />

          {/* _____REQUIRE AUTH_____  */}
          <Route path="/" element={ <RequireAuth /> }>

            <Route path="/" element={ <Habits /> } />
            <Route path="/settings" element={ <SettingsView /> } />
            <Route path="/add-habit" element={ <AddHabitVIew /> } />
            <Route path="/habit/:habitId/*" element={ <HabitView /> } />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

