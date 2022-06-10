import { useHabits } from '../../../hooks/useHabits';

import './Streaks.css';

export const Streaks = () => {

  const { habits } = useHabits();

  return (
    <div className="Streaks">
      <div className="Streaks__cell-titles cell"><span>current streak</span> <span>longest streak</span></div>
      { habits.map(habit => {
        let longestStreak = 0;
        let currentStreak = 0;

        habit.stats.forEach((stat, index) => {
          if (stat === 2) {
            currentStreak++;
          }
          if (stat === 0 && index !== habit.stats.length - 1) {
            currentStreak = 0;
          }
          longestStreak = longestStreak < currentStreak ? currentStreak : longestStreak;
        });
        return <div className="Streaks__cell cell"
                    key={ habit.id }>
          <div className="Streaks__streak"
               style={ { borderColor: habit.color, color: habit.color } }>{ currentStreak }</div>
          <div className="Streaks__streak">{ longestStreak }</div>
        </div>;
      }) }
    </div>
  );
};