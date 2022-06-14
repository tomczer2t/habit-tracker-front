import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './Description.css';

export const Description = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (auth) return;
    navigate('/register', { state: { from: location.pathname }, replace: true });
  };

  return (
    <section className="Description">
      <h2 className="Description__title">Welcome on Habit Tracker</h2>
      <div className="Description__paraphs">
        <p>This application is designed for people who want to be a better version of themselves every day. Track your
           habits. Add new ones and edit old ones. Stay motivated by your current streak and don't let your streak
           end. </p>
        <p><Link to="/register"
                 onClick={ handleClick }>Create an account to track your habits!</Link></p>
      </div>
    </section>
  );
};