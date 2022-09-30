import React from 'react';
import { Description } from '../../components/Description/Description';
import { ExampleHabits } from '../../components/ExampleHabits/ExampleHabits';

import './InfoView.css';
import { useLocation } from 'react-router-dom';
import { GoBackBtn } from '../../components/common/GoBackBtn/GoBackBtn';

export const InfoView = () => {

  const location = useLocation();
  const from = (location?.state as { from: string } )?.from;

  return (
    <article className="InfoView">
      { from && <GoBackBtn /> }
      <Description />
      <ExampleHabits />
    </article>
  );
};
