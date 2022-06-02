import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../../hooks/useHabits';
import { Colors } from './Colors/Colors';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import './AddHabit.css';
import { GoHomeBtn } from '../common/GoHomeBtn/GoHomeBtn';

export const AddHabit = () => {

  const [form, setForm] = useState({ name: '', color: '#d71212' });
  const [nameError, setNameError] = useState('');
  const { auth } = useAuth();
  const { setHabits } = useHabits();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
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
    } catch (e) {

    }
  };

  return (
    <div className="AddHabit">
      <GoHomeBtn />
      <form onSubmit={ handleSubmit }
            className="AddHabit__form">
        <h2>New habit</h2>

        <label className="AddHabit__label-container">Habit:
          <input type="text"
                 className="AddHabit__input"
                 value={ form.name }
                 onChange={ e => handleChange('name', e.target.value) }
                 required
                 min={ 1 }
                 max={ 40 } />
          { nameError && <p className="AddHabit__input-error">{ nameError }</p> }
        </label>


        <p>Pick a color:</p>
        <Colors currentColor={ form.color }
                handleChange={ handleChange } />

        <button className="AddHabit__add-btn"
                disabled={ !form.name || form.name.length > 40 || form.name.length < 1 }>add
        </button>
      </form>
    </div>
  );
};