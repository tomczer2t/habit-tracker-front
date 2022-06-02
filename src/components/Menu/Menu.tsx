import { FcSettings } from 'react-icons/fc';
import './Menu.css';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';


export const Menu = () => {

  const { auth } = useAuth();

  return (
    <header className="Menu">
      <h1 className="Menu__title">Habit Tracker</h1>

      { auth && <FcSettings className="Menu__settings-icon"/>}
      { !auth && (
        <div className="Menu__auth-btns">
          <button className="Menu__auth-single-btn"><NavLink to="/login">login</NavLink></button>
          <button className="Menu__auth-single-btn"><NavLink to="/register">register</NavLink></button>
        </div>
      ) }

    </header>
  );
};