import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { HabitEntity } from 'types';
import { HabitHistory } from './HabitHistory/HabitHistory';
import { useHabits } from '../../hooks/useHabits';
import { LoadingSpinner } from '../common/LoadingSpinner/LoadingSpinner';
import { NotFoundBox } from '../common/NotFoundBox/NotFoundBox';
import { useAuth } from '../../hooks/useAuth';

import './SpecificHabit.css';

export const SpecificHabit = () => {

  const [habit, setHabit] = useState<Required<HabitEntity> | null>(null);
  const [loading, setLoding] = useState(false);
  const { habitId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { habits } = useHabits();
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoding(true);
        const { data } = await axiosPrivate.get(`habits/${ habitId }`);
        setLoding(false);
        if (!data) {
          return;
        }
        const stats: number[] = [];
        data.stats.forEach((stat: number) => stats.unshift(stat));
        if (stats.length < 360) {
          stats.push(...Array(360 - stats.length).fill(0));
        }
        setHabit({ ...data, stats });
      } catch (e) {
        if (auth)
        navigate('/error');
      }
    })();
  }, [habitId, habits, axiosPrivate]);


  return (
    <article className="SpecificHabit">
      { loading && <div className="SpecificHabit__loading-spinner"><LoadingSpinner /></div> }
      { habit && <HabitHistory habit={ habit } /> }
      { !loading && !habit && <NotFoundBox text="Habit not found" />}
    </article>
  );
};