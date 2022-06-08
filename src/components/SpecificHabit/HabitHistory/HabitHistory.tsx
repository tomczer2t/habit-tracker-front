import { HabitEntity } from 'types';
import { useEffect } from 'react';
import './HabitHistory.css';
import { StatsTable } from './StatsTable/StatsTable';

interface Props {
  habit: Required<HabitEntity>;
}

export const HabitHistory = ({ habit }: Props) => {

  useEffect(() => {

  }, []);

  return (
    <div className="HabitHistory">
      <h2 className="HabitHistory__habit-name">{ habit.name }</h2>
      <StatsTable stats={ habit.stats }
                  color={ habit.color } />
      <div className="HabitHistory__streaks">

      </div>
    </div>
  );
};