import React from 'react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useHabits } from '../../../hooks/useHabits';
import { useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';
import { Colors } from './Colors/Colors';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import './HabitForm.css';

const spinnerStyle = {
  position: 'absolute',
  right: '1rem',
}

interface Props {
  form: { name: string, color: string };
  setForm: Dispatch<SetStateAction<{ name: string, color: string }>>;
  type: 'add' | 'edit';
  habitId?: string;
}

export const HabitForm = ({ form, setForm, type, habitId }: Props) => {

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setHabits } = useHabits();
  const { auth } = useAuth();

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setError('');
    setNameError('');
    const nameLength = form.name.length;
    if (nameLength > 40) {
      setNameError('Name cannot be longer than 40 characters.');
    }
  }, [form.name]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!form.name || form.name.length > 40 || form.name.length < 1) return;
      setSubmitLoading(true);
      if (type === 'add') {
        const { data } = await axiosPrivate.post('habits', { ...form, userId: auth?.id, lastStatUpdateDate: new Date()});
        setHabits(prev => {
          const copy = [...prev];
          copy.push({...data,  lastStatUpdateDate: new Date(data.lastStatUpdateDate), firstStatDate: new Date(data.firstStatDate)});
          return copy;
        });
      } else {
        const { data } = await axiosPrivate.patch(`habits/${ habitId }`, { ...form, userId: auth?.id });
        setHabits(prev => {
          const copy = prev.filter(habit => habit.id !== habitId);
          copy.push(data);
          copy.sort((a, b) => a.orderNo - b.orderNo);
          return copy;
        });
      }

      setSubmitLoading(false);
      navigate('/');
    } catch (e: any) {
      setSubmitLoading(false);
      const message = e.response.data?.message || 'Sorry. Something went wrong. Please try again later.';
      setError(message);
    }
  };

  const handleDelete = async () => {
    try {
      if (!deleteConfirm) {
        setDeleteConfirm(true);
        return;
      }
      setDeleteLoading(true);
      await axiosPrivate.delete(`habits/${ habitId }`);
      setHabits(prev => prev.filter(habit => habit.id !== habitId));
      navigate('/');
    } catch (e: any) {
      setDeleteLoading(false);
      const message = e.response.data.message || 'Sorry. Something went wrong. Please try again later.';
      setError(message);
    }
  };

  return (
    <form onSubmit={ handleSubmit }
          className="HabitForm">
      <h2>{ type === 'add' ? 'New habit' : 'Edit habit' }</h2>

      <label className="HabitForm__label-container">Habit:
        <input type="text"
               className="HabitForm__input"
               value={ form.name }
               onChange={ e => handleChange('name', e.target.value) }
               required
               min={ 1 }
               max={ 40 } />
        { nameError && <p className="HabitForm__input-error">{ nameError }</p> }
      </label>


      <p>Pick a color:</p>
      <Colors currentColor={ form.color }
              handleChange={ handleChange } />

      { error && <p className="HabitForm__error">{ error }</p> }

      <button className="HabitForm__btn HabitForm__btn--submit"
              disabled={ !form.name || form.name.length > 40 || form.name.length < 1 || !!error }
      >{ type }{ submitLoading && <LoadingSpinner style={spinnerStyle}/> }</button>

      { type === 'edit' && (
        <button type="button"
                className={ `HabitForm__btn HabitForm__btn--delete ${ deleteConfirm ? 'HabitForm__btn--delete-confirm' : '' }` }
                onClick={ handleDelete }>delete{ deleteLoading && <LoadingSpinner style={{ ...spinnerStyle, color: '#000'}}/> }</button>
      ) }
    </form>
  );
};
