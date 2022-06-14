import React from 'react';
import { Description } from '../../components/Description/Description';
import { ExampleHabits } from '../../components/ExampleHabits/ExampleHabits';

import './InfoView.css';

export const InfoView = () => {

  return (
    <article className="InfoView">
      <Description />
      <ExampleHabits />
    </article>
  );
};