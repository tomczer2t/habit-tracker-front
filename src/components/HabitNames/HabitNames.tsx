import { useHabits } from '../../hooks/useHabits';
import './HabitNames.css';

export const HabitNames = () => {

  const { habits } = useHabits();

  return (
    <div className="names">
      <div className="name">Habits</div>
      { habits.map(habit => (
        <div key={ habit.id + 'name' }
             className="name">{ habit.name }</div>
      )) }
    </div>
  )
}