import React from 'react';
import { HabitNames } from './HabitNames/HabitNames';
import { HabitStats } from './HabitStats/HabitStats';
import { Streaks } from './Streaks/Streaks';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { InfoView } from '../../views/InfoView/InfoView';

import './Habits.css';

export const Habits = () => {

  const { auth } = useAuth();

  return (
   <>
     { auth && (
       <div className="Board__habits Habits">
         <div className="Habits__names-column">
           <HabitNames />
           <Link to="/add-habit"
                 className="Habits__add-habit-link">+</Link>
         </div>
         <HabitStats />
         <Streaks />
       </div>
     )}
     { !auth && <InfoView />}
   </>
  );
};