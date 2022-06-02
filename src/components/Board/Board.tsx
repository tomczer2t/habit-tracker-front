import './Board.css';
import { useEffect } from 'react';
import { HabitEntity } from 'types';
import { useHabits } from '../../hooks/useHabits';
import { Menu } from '../Menu/Menu';
import { Habits } from '../Habits/Habits';
import { Route, Routes } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { RequireAuth } from '../RequireAuth/RequireAuth';
import { useAuth } from '../../hooks/useAuth';
import { AddHabit } from '../AddHabit/AddHabit';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';


export const Board = () => {

  const { setHabits } = useHabits();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    (async () => {
      try {
        if (!auth) return;
        const { data } = await axiosPrivate.get(`habits/${ auth?.id }`) as { data: Required<HabitEntity>[] };
        setHabits(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [auth, setHabits]);

  return (
    <article className="Board">
      <Menu />

      <Routes>
        <Route path="/login"
               element={ <Auth /> } />
        <Route path="/register"
               element={ <Auth /> } />
        <Route path="/"
               element={ <RequireAuth /> }>
          <Route path="/"
                 element={ <Habits /> } />
          <Route path="/add-habit"
                 element={ <AddHabit /> } />
        </Route>
      </Routes>

    </article>
  );
};
