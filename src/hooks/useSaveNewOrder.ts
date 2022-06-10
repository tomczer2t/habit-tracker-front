import { HabitEntity } from 'types';
import { useHabits } from './useHabits';
import { useAxiosPrivate } from './useAxiosPrivate';

export const useNewOrderHabits = () => {

  const { habits, setHabits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  return async function (names: { id: string }[]) {

    const giveHabitsWithNewOrder = () => {
      const habitsWithNewOrder: Required<HabitEntity>[] = [];
      for (let i = 0; i < names.length; i++) {
        const foundHabit = habits.filter((habit) => habit.id === names[i].id)[0];
        foundHabit.orderNo = i + 1;
        habitsWithNewOrder.push(foundHabit);
      }
      return habitsWithNewOrder;
    }
    const newOrderHabits = giveHabitsWithNewOrder();
    setHabits(newOrderHabits);
    return newOrderHabits
  };
};


