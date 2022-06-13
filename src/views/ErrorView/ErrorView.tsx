import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './ErrorView.css';

export const ErrorView = () => {

  return (
    <article className="ErrorView">
      <div  className="ErrorView__icon-wrapper">
        <BsFillExclamationTriangleFill/>
      </div>
      <p className="ErrorView__top-paraph">Oops!</p>
      <p className="ErrorView__bottom-paraph">Something went wrong.</p>
      <Link className="ErrorView__link" to="/">Go back to home page</Link>
    </article>
  );
};