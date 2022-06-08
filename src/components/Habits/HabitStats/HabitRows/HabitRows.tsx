import { useHabits } from '../../../../hooks/useHabits';
import { HabitRow } from './HabitRow/HabitRow';
import './HabitRows.css';

export const HabitRows = () => {

  const { habits } = useHabits();


  return (
    <div className="HabitsRows">
      { habits.map(habit => (
        <HabitRow habit={ habit }
                  key={ habit.id } />
      )) }
    </div>
  );
};