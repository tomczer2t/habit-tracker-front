import React from 'react';
import { useState } from 'react';
import { HabitForm } from '../common/HabitForm/HabitForm';


export const AddHabitForm = () => {
  const [form, setForm] = useState({ name: '', color: '#d71212' });

  return <HabitForm form={ form }
                    setForm={ setForm }
                    type="add" />;
};