import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../../hooks/useHabits';
import { Colors } from './Colors/Colors';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import './AddHabitForm.css';


export const AddHabitForm = () => {
  const [form, setForm] = useState({ name: '', color: '#d71212' });
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const { auth } = useAuth();
  const { setHabits } = useHabits();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setError('');
    setNameError('');
    const nameLength = form.name.length;
    if (nameLength > 40) {
      setNameError('Name cannot be longer than 40 characters.');
    }
  }, [form.name]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!form.name || form.name.length > 40 || form.name.length < 1) return;
      const { data } = await axiosPrivate.post('habits', { ...form, userId: auth?.id });
      setHabits(prev => {
        const copy = [...prev];
        copy.push(data);
        return copy;
      });
      navigate('/');
    } catch (e: any) {
        const message = e.response.data.message || 'Sorry. Something went wrong. Please try again later.';
        setError(message);
    }
  };

  return (
    <form onSubmit={ handleSubmit }
          className="AddHabitForm">
      <h2>New habit</h2>

      <label className="AddHabitForm__label-container">Habit:
        <input type="text"
               className="AddHabitForm__input"
               value={ form.name }
               onChange={ e => handleChange('name', e.target.value) }
               required
               min={ 1 }
               max={ 40 } />
        { nameError && <p className="AddHabitForm__input-error">{ nameError }</p> }
      </label>


      <p>Pick a color:</p>
      <Colors currentColor={ form.color }
              handleChange={ handleChange } />

      { error && <p className="AddHabitForm__error">{ error }</p>}

      <button className="AddHabitForm__add-btn"
              disabled={ !form.name || form.name.length > 40 || form.name.length < 1 || !!error }>add
      </button>
    </form>
  );
};