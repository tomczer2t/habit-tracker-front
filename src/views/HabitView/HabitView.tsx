import './HabitVIew.css';
import { FiEdit2 } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GoBackBtn } from '../../components/common/GoBackBtn/GoBackBtn';


export const HabitView = () => {

  const location = useLocation();

  return (
    <article className="HabitView">
      <div className="HabitView__links">
        <GoBackBtn />
        { !location.pathname.endsWith('/edit') && <Link to={`${ location.pathname}/edit`} className="HabitView__edit-link" state={{ from: location.pathname }}><FiEdit2 /></Link> }
      </div>
      <Outlet />
    </article>
  );
};