import React from 'react';
import { HabitEntity } from 'types';
import { useHabits } from '../../../../../hooks/useHabits';
import { useAxiosPrivate } from '../../../../../hooks/useAxiosPrivate';

import './HabitRow.css';
import { getCurrentColor } from '../../../../../utils/getCurrentColor';
import { getTextStatus } from '../../../../../utils/getTextStatus';

interface Props {
  habit: Required<HabitEntity>;
}

export const HabitRow = ({ habit }: Props) => {

  const { habits, setHabits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  const handleClick = async (habitId: string, index: number) => {
    if (!habits) return;
    const stats = habits.filter(habit => habit.id === habitId)[0].stats
      .map((stat, i) => {
        if (i !== index) return stat;
        if (stat === 0) return 2;
        if (stat === 1) return 0;
        return 1;
      });
    setHabits(prev => {
      return prev.map(habit => {
        if (habit.id === habitId) {
          return { ...habit, stats };
        } else {
          return habit;
        }
      });
    });
    await axiosPrivate.patch(`habits/${ habitId }`, { stats, lastStatUpdateDate: new Date() });
  };
  return (
    <div className="HabitRow"
         key={ habit.id }>
      { habit.stats.map((stat, i) => {
        const statsLength = habit.stats.length;
        const statsToOmit = statsLength - 40;
        if (i < statsToOmit) return null;

        const textStatus = getTextStatus(stat);
        const color = getCurrentColor(habit.stats, i, habit.color);
        return (
          <div onClick={ () => handleClick(habit.id, i) }
               key={ habit.id + i }
               data-name={ habit.name.slice(0, 10) }
               style={ { backgroundColor: color, color: habit.color } }
               className={ `item ${ textStatus }` } />
        );
      }) }
    </div>
  );
};
