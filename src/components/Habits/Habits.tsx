import { HabitNames } from './HabitNames/HabitNames';
import { HabitStats } from './HabitStats/HabitStats';
import { Streaks } from './Streaks/Streaks';
import './Habits.css';
import { Link } from 'react-router-dom';

export const Habits = () => {

  return (
    <div className="Board__habits Habits">
      <div className="Habits__names-column">
        <HabitNames />
        <Link to="/add-habit"
              className="Habits__add-habit-link">+</Link>
      </div>
      <HabitStats />
      <Streaks />
    </div>
  );
};