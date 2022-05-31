import { useHabits } from '../../hooks/useHabits';
import { useEffect, useRef } from 'react';
import { axios } from '../../api/axios';
import './HabitStats.css';
import { DatesRow } from './DatesRow/DatesRow';

export const HabitStats = () => {
  const { habits, setHabits } = useHabits();

  const wrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!habits) return;
    const scrollToEnd = () => {
      wrapperRef.current.scrollTo(wrapperRef.current.scrollWidth, 0);
    };
    window.addEventListener('resize', () => {
      const scrollFromRightEdge = Math.abs((wrapperRef.current.scrollWidth - wrapperRef.current.offsetWidth) - wrapperRef.current.scrollLeft);
      if (scrollFromRightEdge < 120) {
        scrollToEnd();
      }
    });
    scrollToEnd();
  }, [habits?.length]);

  const handleClick = async (habitId: string, index: number) => {
    if (!habits) return;
    const stats = habits.filter(habit => habit.id === habitId)[0].stats
      .map((stat, i) => {
        if (i !== index) return stat;
        if (stat === 0) return 2;
        if (stat === 1) return 0;
        return 1;
      });

    const { data } = await axios.patch(`habits/${ habitId }`, { stats });
    console.log(data);
    setHabits(prev => {
      const copy = [...prev];
      console.log({ copy });
      return copy.map(habit => {
        console.log({ habit });
        if (habit.id !== habitId) return habit;
        return { ...habit, stats: data.stats };
      });
    });
  };

  return (
    <section ref={ wrapperRef }
             className="wrapper">
      <div className="rows"
           style={ { width: `${ 40 * 40 }px` } }>

        <DatesRow />

        { habits.map(habit => (
          <div className="row"
               key={ habit.id }>
            { habit.stats.map((stat, i) => {
              const statsLength = habit.stats.length;
              const statsToOmit = statsLength - 40;
              if (i < statsToOmit) return null;

              let textStatus: string;

              if (stat === 0) textStatus = 'undone';
              else if (stat === 2) textStatus = 'done';
              else textStatus = 'skipped';

              return (
                <div onClick={ () => handleClick(habit.id, i) }
                     key={ habit.id + i }
                     className={ `item ${ textStatus }` }>{ i + 1 }</div>
              );
            }) }
          </div>
        )) }

      </div>
    </section>
  )
}