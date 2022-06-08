import { GoHomeBtn } from '../../components/common/GoHomeBtn/GoHomeBtn';
import './HabitVIew.css';
import { SpecificHabit } from '../../components/SpecificHabit/SpecificHabit';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export const HabitView = () => {

  return (
    <article className="HabitView">
      <div className="HabitView__links">
        <GoHomeBtn />
        <Link to="/" className="HabitView__edit-link"><FiEdit2 /></Link>
      </div>
      <SpecificHabit />
    </article>
  );
};