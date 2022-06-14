import React from 'react';

import './NotFoundBox.css';

interface Props {
  text: string;
}

export const NotFoundBox = ({ text }: Props) => {

  return (
    <div className="NotFoundBox">
      <h1 className="NotFoundBox__title">{ text }</h1>
      <p className="NotFoundBox__background-text">404</p>
    </div>
  );
};