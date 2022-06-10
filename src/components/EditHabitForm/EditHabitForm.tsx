import { HabitForm } from '../common/HabitForm/HabitForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHabits } from '../../hooks/useHabits';


export const EditHabitForm = () => {

  const [form, setForm] = useState({ name: '', color: '#d71212' });
  const { habits } = useHabits();
  const { habitId } = useParams();

  useEffect(() => {
    const habit = habits.filter(habit => habit.id === habitId)[0] ;
    if (!habit) {

      return;
    }
    setForm({ name: habit.name, color: habit.color });
  }, [habits, habitId]);

  return <HabitForm form={ form }
                    setForm={ setForm }
                    habitId={ habitId }
                    type="edit" />;
};