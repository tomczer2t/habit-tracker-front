import { HabitEntity } from 'types';
import { StatsTable } from './StatsTable/StatsTable';
import { HabitStreaks } from './HabitStreaks/HabitStreaks';

import './HabitHistory.css';

interface Props {
  habit: Required<HabitEntity>;
}

export const HabitHistory = ({ habit }: Props) => {

  return (
    <div className="HabitHistory">
      <h2 className="HabitHistory__habit-name">{ habit.name }</h2>
      <StatsTable stats={ habit.stats.slice(0, 360) }
                  color={ habit.color } />
      <HabitStreaks stats={ habit.stats }
                    color={ habit.color } />
    </div>
  );
};