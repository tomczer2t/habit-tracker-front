import { useHabits } from './useHabits';
import { useAuth } from './useAuth';
import { useAxiosPrivate } from './useAxiosPrivate';
import { HabitEntity } from 'types';

export const useUpdateHabits = () => {

  const { auth } = useAuth();
  const { setHabits, habits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  return function () {
    if (!auth || !habits[0]) return;
    const id = setInterval(() => {
      const last = new Date(habits[0].lastStatUpdateDate);
      const curr = new Date(new Date().setHours(0, 0, 0, 0));
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
    return id;
  };
};