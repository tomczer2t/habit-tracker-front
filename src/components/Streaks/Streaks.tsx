import { useHabits } from '../../hooks/useHabits';
import './Streaks.css';

export const Streaks = () => {

  const { habits } = useHabits();

  return (
    <div>
      <div className="name">streaks</div>
      { habits.map(habit => {
        let longestStreak = 0;
        let currentStreak = 0;

        habit.stats.forEach(stat => {
          if (stat === 2) {
            currentStreak++;
          }
          if (stat === 0) {
            currentStreak = 0;
          }
          longestStreak = longestStreak < currentStreak ? currentStreak : longestStreak;
        })
        return <div className="name" key={ habit.id }>
          <div>{ currentStreak }</div>
          <div>{ longestStreak }</div>
        </div>
      })}
    </div>
  )
}