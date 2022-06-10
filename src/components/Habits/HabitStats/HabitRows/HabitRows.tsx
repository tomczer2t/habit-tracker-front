import { useHabits } from '../../../../hooks/useHabits';
import { HabitRow } from './HabitRow/HabitRow';
import './HabitRows.css';
import { useEffect } from 'react';

export const HabitRows = () => {

  const { habits } = useHabits();

  useEffect(() => {
    console.log('zmiana');
  }, [habits]);


  return (
    <div className="HabitsRows">
      { habits.map(habit => (
        <HabitRow habit={ habit }
                  key={ habit.id } />
      )) }
    </div>
  );
};