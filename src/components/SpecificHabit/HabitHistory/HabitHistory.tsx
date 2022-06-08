import { HabitEntity } from 'types';
import { useEffect } from 'react';
import './HabitHistory.css';
import { StatsTable } from './StatsTable/StatsTable';
import { HabitStreaks } from './HabitStreaks/HabitStreaks';

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
     <HabitStreaks stats={ habit.stats } color={ habit.color }/>
    </div>
  );
};