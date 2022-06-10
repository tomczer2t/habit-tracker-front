import React, { useCallback, useEffect, useState } from 'react';
import { SinglNameItem } from './SingleNameItem/SinglNameItem';
import { useDrop } from 'react-dnd';
import { useHabits } from '../../../hooks/useHabits';
import { useNewOrderHabits } from '../../../hooks/useSaveNewOrder';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';

import './HabitNames.css';

export const HabitNames = () => {

  const { habits } = useHabits();
  const [names, setNames] = useState<{ name: string, orderNo: number, id: string }[]>([]);
  const newOrderHabits = useNewOrderHabits();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setNames(habits.map(habit => ({ name: habit.name, orderNo: habit.orderNo, id: habit.id })));
  }, [habits]);

  const findCard = useCallback(
    (id: string) => {
      const name = names.filter((name) => `${ name.id }` === id)[0];
      return {
        name,
        index: names.indexOf(name),
      };
    },
    [names],
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { index } = findCard(id);
      setNames(prev => {
        const copy = [...prev];
        const item = copy.splice(index, 1)[0];
        copy.splice(atIndex, 0, item);
        return copy;
      });
    },
    [findCard, setNames],
  );

  const saveNewOrder = useCallback(
    async () => {
      const newOrder = await newOrderHabits(names);
      for (const habit of newOrder) {
        await axiosPrivate.patch(`habits/${ habit.id }`, { orderNo: habit.orderNo });
      }
    },
    [names, axiosPrivate, newOrderHabits],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item) => {
        console.log(item);
        console.log('drop');
      },
    }));

  return (
    <div className="HabitNames">
      <div className="HabitNames__title-cell cell">Habits</div>
      <ul ref={ drop }>
        { names.map((habit) => (
          <SinglNameItem key={ habit.id }
                         habit={ habit }
                         moveCard={ moveCard }
                         saveNewOrder={ saveNewOrder }
                         findCard={ findCard } />
        )) }
      </ul>
    </div>
  );
};
