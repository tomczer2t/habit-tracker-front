import { FcSettings } from 'react-icons/fc';
import { useAuth } from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

import './Menu.css';


export const Menu = () => {

  const { auth } = useAuth();

  return (
    <header className="Menu">
      <Link to="/"><h1 className="Menu__title">Habit Tracker</h1></Link>

      { auth && <Link to="/settings" className="Menu__settings-link"><FcSettings className="Menu__settings-icon" /></Link> }
      { !auth && (
        <div className="Menu__auth-btns">
          <button className="Menu__auth-single-btn"><NavLink to="/login">login</NavLink></button>
          <button className="Menu__auth-single-btn"><NavLink to="/register">register</NavLink></button>
        </div>
      ) }

    </header>
  );
};