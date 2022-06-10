import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Auth } from './components/Auth/Auth';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Habits } from './components/Habits/Habits';
import { HabitView } from './views/HabitView/HabitView';
import { AddHabitView } from './views/AddHabitView/AddHabitView';
import { SettingsView } from './views/SettingsView/SettingsView';
import { SpecificHabit } from './components/SpecificHabit/SpecificHabit';
import { EditHabitForm } from './components/EditHabitForm/EditHabitForm';
import { NoMatchView } from './views/NoMatchView/NoMatchView';
import { EmailEditor } from './components/EmailEditor/EmailEditor';
import { PasswordEditor } from './components/PasswordEditor/PasswordEditor';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <MainLayout /> }>
          <Route path="login" element={ <Auth /> } />
          <Route path="register" element={ <Auth /> } />
          <Route path="*" element={ <NoMatchView /> } />
           {/*_____REQUIRE AUTH_____  */}
          <Route path="/" element={ <RequireAuth /> }>
            <Route index element={ <Habits /> } />
            <Route path="settings" element={ <SettingsView /> } >
              <Route path="email" element={ <EmailEditor /> }/>
              <Route path="password" element={ <PasswordEditor /> }/>
            </Route>
            <Route path="add-habit" element={ <AddHabitView /> } />
            <Route path="habit/:habitId" element={ <HabitView /> }>
              <Route index element={ <SpecificHabit /> } />
              <Route path="edit" element={ <EditHabitForm /> } />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

