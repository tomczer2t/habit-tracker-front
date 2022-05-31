import { useHabits } from '../../hooks/useHabits';
import './HabitNames.css';

export const HabitNames = () => {

  const { habits } = useHabits();

  return (
    <div className="HabitNames">
      <div className="HabitNames__title-cell cell">Habits</div>
      { habits.map(habit => (
        <div key={ habit.id }
             className="HabitNames__cell cell">{ habit.name }</div>
      )) }
    </div>
  );
};