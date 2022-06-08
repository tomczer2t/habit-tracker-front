import { HabitEntity } from 'types';
import { useEffect } from 'react';
import './HabitHistory.css';

interface Props {
  habit: Required<HabitEntity>;
}

export const HabitHistory = ({ habit }: Props) => {

  useEffect(() => {

  },[])

  return (
    <div className="HabitHistory">
      <h2 className="HabitHistory__habit-name">{ habit.name }</h2>
      <div className="HabitHistory__table">
        { habit.stats.map((stat, index) => {
          let textStatus: string;
          if (stat === 0) textStatus = 'undone';
          else if (stat === 2) textStatus = 'done';
          else textStatus = 'skipped';


          return <div key={ index }
                      className={`HabitHistory__cell HabitHistory__cell--${ textStatus }`}
                      style={{ backgroundColor: habit.color, color: habit.color }}
          />
        })}
      </div>
    </div>
  );
};