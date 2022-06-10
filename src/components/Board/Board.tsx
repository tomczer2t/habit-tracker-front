import { ReactNode, useEffect } from 'react';
import { HabitEntity } from 'types';
import { useHabits } from '../../hooks/useHabits';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useRefreshHabits } from '../../hooks/useRefreshHabits';

import './Board.css';

interface Props {
  children?: ReactNode;
}

export const Board = ({ children }: Props) => {

  const { setHabits } = useHabits();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  useRefreshHabits();


  useEffect(() => {
    (async () => {
      try {
        if (!auth) return;
        const { data } = await axiosPrivate.get(`habits?user=${ auth.id }`) as { data: Required<HabitEntity>[] };
        setHabits(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [auth, setHabits, axiosPrivate]);

  return (
    <article className="Board">
      { children }
    </article>
  );
};
