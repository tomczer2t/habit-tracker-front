import { useHabits } from './useHabits';
import { useAuth } from './useAuth';
import { useAxiosPrivate } from './useAxiosPrivate';
import { getHabitsWithUpdatedStats } from '../utils/getHabitsWithUpdatedStats';

export const useUpdateHabits = () => {

  const { auth } = useAuth();
  const { setHabits, habits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  return function () {
    if (!auth || !habits[0]) return;
    const id = setInterval(() => {
      const lastTime = habits[0].lastStatUpdateDate.getTime();
      const currTime = new Date().setHours(0, 0, 0, 0);
      if (lastTime === currTime) return;
      (async () => {
        const freshHabits = getHabitsWithUpdatedStats(habits);
        setHabits(freshHabits);
        for (const habit of freshHabits) {
          await axiosPrivate.patch(`habits/${ habit.id }`, {
            stats: habit.stats,
            lastStatUpdateDate: new Date(),
          });
        }
      })();
    }, 1000);
    return id;
  };
};