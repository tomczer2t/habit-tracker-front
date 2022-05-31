import './Board.css';
import { useEffect } from 'react';
import { HabitEntity } from 'types';
import { axios } from '../../api/axios';
import { useHabits } from '../../hooks/useHabits';
import { HabitNames } from '../HabitNames/HabitNames';
import { Streaks } from '../Streaks/Streaks';
import { HabitStats } from '../HabitStats/HabitStats';


export const Board = () => {

  const { setHabits } = useHabits();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('habits') as { data: Required<HabitEntity>[] };
        setHabits(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <article className="Board">
      <HabitNames />
      <HabitStats />
      <Streaks />
    </article>
  );
};
