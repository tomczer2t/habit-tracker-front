import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa';

import './PageFooter.css';

export const PageFooter = () => {

  return (
    <footer className="PageFooter">
      <div className="PageFooter__content">
        <p className="PageFooter__icons">
          <a href="mailto:czerwitom@gmail.com" target="_blank" rel="noreferrer"><HiOutlineMail /></a>
          <a href="https://www.linkedin.com/in/tomasz-czerwi%C5%84ski-751b6b231/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
        </p>
        <p>Tomasz Czerwiński</p>
      </div>
      <p>This page is Everyday Habit Tracker app clone. Designed only for practice and study purpose.</p>
    </footer>
  );
};