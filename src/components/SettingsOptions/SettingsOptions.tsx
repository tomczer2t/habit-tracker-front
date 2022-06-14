import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useHabits } from '../../hooks/useHabits';

import './SettingsOptions.css';

export const SettingsOptions = () => {

  const [confirm, setConfirm] = useState(false);
  const [deleteError ,setDeleteError] = useState(false);
  const { setAuth, auth } = useAuth();
  const { setHabits } = useHabits();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setAuth(null);
    setHabits([]);
    await axiosPrivate.delete('sessions');
  };

  const handleDelete = async (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      if (!confirm) {
        setConfirm(true);
        return;
      }
      await axiosPrivate.delete('sessions');
      await axiosPrivate.delete(`users/${ auth?.id }`);
      localStorage.removeItem('user');
      setAuth(null);
    } catch (e) {
      setDeleteError(true);
    }
  };

  return (
    <section className="SettingsOptions">
      <Link to="email"
            className="SettingsOptions__link">Change email</Link>
      <Link to="password"
            className="SettingsOptions__link">Change password</Link>
      <Link to="/info"
            className="SettingsOptions__link">Page info</Link>
      <Link to="/logout"
            className="SettingsOptions__link"
            onClick={ handleLogout }>Logout</Link>
      <Link to="/delete-account"
            className={ `SettingsOptions__link ${ confirm ? 'SettingsOptions__link--delete' : '' }` }
            onClick={ handleDelete }>{ !confirm ? 'Delete account' : 'Are you sure?' }</Link>
    </section>
  );
};