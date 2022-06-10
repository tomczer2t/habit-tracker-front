import './NoMatchView.css';
import { Link } from 'react-router-dom';

export const NoMatchView = () => {

  return (
    <article className="NoMatchView">
      <div className="NoMatchView__404-box">
        <h1 className="NoMatchView__title">Page not found</h1>
        <p className="NoMatchView__background-text">404</p>
      </div>
      <Link to="/" className="NoMatchView__link">Back to homepage</Link>
    </article>
  );
};