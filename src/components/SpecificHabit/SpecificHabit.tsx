import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { HabitEntity } from 'types';
import { HabitHistory } from './HabitHistory/HabitHistory';

export const SpecificHabit = () => {

  const [habit, setHabit] = useState<Required<HabitEntity> | null>(null);
  const { habitId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const { data } = await axiosPrivate.get(`habits/${ habitId }`);
      const stats: number[] = [];
      data.stats.forEach((stat: number) => stats.unshift(stat));
      if (stats.length < 360) {
        stats.push(...Array(360 - stats.length).fill(0));
      } else if (stats.length > 360) {
        stats.splice(360 - stats.length);
      }
      setHabit({ ...data, stats });
    })();
  }, [habitId]);

  if (!habit) return null;
  return (
    <article>
      <HabitHistory habit={ habit }/>
    </article>
  );
};