import React from 'react';
import { ReactNode, useEffect } from 'react';
import { HabitEntity } from 'types';
import { useHabits } from '../../hooks/useHabits';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useUpdateHabits } from '../../hooks/useUpdateHabits';
import { getHabitsWithUpdatedStats } from '../../utils/getHabitsWithUpdatedStats';

import './Board.css';

interface Props {
  children?: ReactNode;
}

export const Board = ({ children }: Props) => {

  const { habits, setHabits } = useHabits();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const updateHabits = useUpdateHabits();

  useEffect(() => {
    const id = updateHabits();

    return () => clearInterval(id);
  }, [habits, updateHabits]);

  useEffect(() => {
    (async () => {
      try {
        if (!auth) return;
        const { data } = await axiosPrivate.get(`habits?user=${ auth.id }`) as { data: Required<HabitEntity>[] };
        const updatedHabits = getHabitsWithUpdatedStats(data);
        setHabits(updatedHabits.map(habit => (
          {
            ...habit,
            lastStatUpdateDate: new Date(habit.lastStatUpdateDate),
            firstStatDate: new Date(habit.firstStatDate),
          })));
      } catch (e) {
        navigate('/error');
      }
    })();
  }, [auth, setHabits, axiosPrivate]);

  return (
    <article className="Board">
      { children }
    </article>
  );
};
