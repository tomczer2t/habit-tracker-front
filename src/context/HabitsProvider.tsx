import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { HabitEntity } from 'types';

export const HabitsContext = createContext<{ habits: Required<HabitEntity>[], setHabits: Dispatch<SetStateAction<Required<HabitEntity>[] | []>> }>({
  habits: [],
  setHabits: () => {},
});

interface Props {
  children?: ReactNode;
}

export const HabitsProvider = ({ children }: Props) => {

  const [habits, setHabits] = useState<Required<HabitEntity>[]>([]);

  return (
    <HabitsContext.Provider value={ { habits, setHabits } }>
      { children }
    </HabitsContext.Provider>
  );
};