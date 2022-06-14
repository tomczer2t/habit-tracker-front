import React from 'react';
import example from '../../assets/img/habits-example.png';

import './ExampleHabits.css';


export const ExampleHabits = () => {

  return (
    <div className="ExampleHabits">
      <h4 className="ExampleHabits__title">Example:</h4>
      <img src={ example } alt="example habits" className="ExampleHabits__image"/>
      <p className="ExampleHabits__drag-info">On PC's you can drag habit names to change your habits order.</p>
    </div>
  );
};