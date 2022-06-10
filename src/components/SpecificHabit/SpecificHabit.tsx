import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { HabitEntity } from 'types';
import { HabitHistory } from './HabitHistory/HabitHistory';
import { useHabits } from '../../hooks/useHabits';

export const SpecificHabit = () => {

  const [habit, setHabit] = useState<Required<HabitEntity> | null>(null);
  const { habitId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { habits } = useHabits();

  useEffect(() => {
    (async () => {
      const { data } = await axiosPrivate.get(`habits/${ habitId }`);
      const stats: number[] = [];
      data.stats.forEach((stat: number) => stats.unshift(stat));
      if (stats.length < 360) {
        stats.push(...Array(360 - stats.length).fill(0));
      }
      setHabit({ ...data, stats });
    })();
  }, [habitId, habits, axiosPrivate]);

  if (!habit) return null;
  return (
    <article>
      <HabitHistory habit={ habit } />
    </article>
  );
};