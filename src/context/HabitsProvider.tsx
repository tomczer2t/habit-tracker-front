import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { HabitEntity } from 'types';

export const HabitsContext = createContext<{ habits: Required<HabitEntity>[] | null, setHabits: Dispatch<SetStateAction<Required<HabitEntity>[] | null>> }>({
  habits: null,
  setHabits: () => {},
});

interface Props {
  children?: ReactNode;
}

export const HabitsProvider = ({ children }: Props) => {

  const [habits, setHabits] = useState<Required<HabitEntity>[] | null>(null);

  return (
    <HabitsContext.Provider value={ { habits, setHabits } }>
      { children }
    </HabitsContext.Provider>
  );
};