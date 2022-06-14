import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundBox } from '../../components/common/NotFoundBox/NotFoundBox';

import './NoMatchView.css';

export const NoMatchView = () => {

  return (
    <article className="NoMatchView">
      <NotFoundBox text="Page not found" />
      <Link to="/" className="NoMatchView__link">Back to homepage</Link>
    </article>
  );
};