import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

import './GoBackBtn.css';

export const GoBackBtn = () => {

  const location = useLocation();

  const from = (location?.state as { from: string } )?.from || '/';

  return (
    <Link to={ from }
          className="GoBackBtn"><BsArrowLeftCircle /></Link>
  );
};