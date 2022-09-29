import React, { MouseEvent, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useHabits } from '../../hooks/useHabits';
import { RiMailSettingsLine, RiUserSettingsLine, RiInformationLine, RiDeleteBin2Line, RiLogoutBoxLine } from 'react-icons/ri';

import './SettingsOptions.css';

export const SettingsOptions = () => {

  const [confirm, setConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
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
      <h1 className="SettingsOptions__title">Settings</h1>
      <div className="SettingsOptions__links-group">
        <NavLink to="email"
                 className="SettingsOptions__link"><RiMailSettingsLine /> Change email</NavLink>
        <NavLink to="password"
                 className="SettingsOptions__link"><RiUserSettingsLine /> Change password</NavLink>
        <Link to="/info"
              className="SettingsOptions__link"><RiInformationLine /> Page info</Link>
        <Link to="/delete-account"
              className={ `SettingsOptions__link ${ confirm ? 'SettingsOptions__link--delete' : '' }` }
              onClick={ handleDelete }>
          { !confirm ?
            <><RiDeleteBin2Line />Delete account</> :
            <><RiDeleteBin2Line />Are you sure?</>
          }
        </Link>
        <Link to="/logout"
              className="SettingsOptions__link"
              onClick={ handleLogout }><RiLogoutBoxLine/> Logout</Link>
      </div>
    </section>
  );
};
