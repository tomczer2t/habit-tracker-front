import { useHabits } from '../../../hooks/useHabits';
import './HabitNames.css';
import { Link } from 'react-router-dom';

export const HabitNames = () => {

  const { habits } = useHabits();

  return (
    <div className="HabitNames">
      <div className="HabitNames__title-cell cell">Habits</div>
      { habits.map(habit => (
        <Link key={ habit.id } to={`/habit/${ habit.id }/${ habit.name.toLowerCase().split(' ').join('-') }`}><div
             className="HabitNames__cell cell" style={{ fontSize: habit.name.length < 20 ? '1em' : '.8em' }}>
          { habit.name }
        </div></Link>
      )) }
    </div>
  );
};