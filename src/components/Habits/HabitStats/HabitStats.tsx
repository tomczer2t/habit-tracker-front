import React, { useEffect, useRef } from 'react';
import { useHabits } from '../../../hooks/useHabits';
import { DatesRow } from './DatesRow/DatesRow';
import { HabitRows } from './HabitRows/HabitRows';

import './HabitStats.css';

export const HabitStats = () => {
  const { habits } = useHabits();

  const wrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!habits) return;
    const scrollToEnd = () => {
      wrapperRef.current.scrollTo(wrapperRef.current.scrollWidth, 0);
    };
    window.addEventListener('resize', () => {
      if (wrapperRef.current) {
        const scrollFromRightEdge = Math.abs((wrapperRef.current.scrollWidth - wrapperRef.current.offsetWidth) - wrapperRef.current.scrollLeft);
        if (scrollFromRightEdge < 120) {
          scrollToEnd();
        }
      }
    });
    scrollToEnd();
  }, [habits?.length]);

  return (
    <section ref={ wrapperRef }
             className="HabitStats">
      <div className="rows"
           style={ { width: `${ 40 * 40 }px` } }
      >
        <DatesRow />
        <HabitRows />
      </div>
    </section>
  );
};