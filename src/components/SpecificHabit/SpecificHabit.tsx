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
      const index1 = data.stats.indexOf(1);
      const index2 = data.stats.indexOf(2);
      data.stats.splice(0, index1 === -1 ? index2 : index1 < index2 ? index1 : index2);
      if (data.stats.length < 360) {
        data.stats.push(...Array(360 - data.stats.length).fill(0));
      } else if (data.stats.length > 360) {
        data.stats.splice(360 - data.stats.length);
      }
      setHabit(data);
    })();
  }, [habitId]);

  if (!habit) return null;
  return (
    <article>
      <HabitHistory habit={ habit }/>
    </article>
  );
};