import './NoMatchView.css';
import { Link } from 'react-router-dom';
import { NotFoundBox } from '../../components/common/NotFoundBox/NotFoundBox';

export const NoMatchView = () => {

  return (
    <article className="NoMatchView">
      <NotFoundBox text="Page not found" />
      <Link to="/" className="NoMatchView__link">Back to homepage</Link>
    </article>
  );
};