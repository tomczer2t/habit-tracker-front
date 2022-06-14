import React, { useEffect, useState } from 'react';

import './HabitStreaks.css';

interface Props {
  stats: number[];
  color: string;
}

export const HabitStreaks = ({ stats, color }: Props) => {

  const [longest, setLongest] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let longestStreak = 0;
    let currentStreak = 0;

    for (let i = stats.length - 1; i >= 0; i--) {
      if (stats[i] === 2) {
        currentStreak++;
      }
      if (stats[i] === 0 && i !== 0) {
        currentStreak = 0;
      }
      longestStreak = longestStreak < currentStreak ? currentStreak : longestStreak;
    }

    setCurrent(currentStreak);
    setLongest(longestStreak);
  }, [stats]);

  return (
    <div className="HabitStreaks">
      <div className="HabitStreaks__single-streak">Current: <span style={ { color } }>{ current }</span></div>
      <div className="HabitStreaks__single-streak">Longest: { longest }</div>
    </div>
  );
};