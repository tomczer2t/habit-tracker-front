import { FcSettings } from 'react-icons/fc';
import './Menu.css';


export const Menu = () => {

  return (
    <header className="Menu">
      <h1>Habit Tracker</h1>

      <FcSettings className="Menu__settings-icon"/>
    </header>
  );
};