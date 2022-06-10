import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useHabits } from './useHabits';
import { useAxiosPrivate } from './useAxiosPrivate';
import { HabitEntity } from 'types';

export const useRefreshHabits = () => {

  const { auth } = useAuth();
  const { habits, setHabits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth) return;
    const id = setInterval(() => {
      if (!habits[0]) return;
      const last = new Date(habits[0].lastStatUpdateDate);
      const curr = new Date(new Date().setHours(0,0,0,0,));
      if (last.getTime() !== curr.getTime()) {
        (async () => {
          const { data } = await axiosPrivate.get(`habits?user=${ auth.id }`) as { data: Required<HabitEntity>[] };
          setHabits(data);
          for (const habit of data) {
            await axiosPrivate.patch(`habits/${ habit.id }`, { stats: habit.stats });
          }
        })();
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [habits, auth, axiosPrivate, setHabits]);
};