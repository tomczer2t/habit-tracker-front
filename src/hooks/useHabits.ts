import { useContext } from 'react';
import { HabitsContext } from '../context/HabitsProvider';

export const useHabits = () => useContext(HabitsContext);