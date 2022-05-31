import './Board.css';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { HabitEntity } from 'types';
import { axios } from '../../api/axios';
import { useHabits } from '../../hooks/useHabits';


export const Board = () => {

  const { habits, setHabits } = useHabits();

  const datesPatternArray: Date[] = Array.from({ length: 40 }, (_, i) => new Date(Date.now() - (24 * 60 * 60 * 1000) * (40 - i - 1)));
  const wrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('habits') as { data: Required<HabitEntity>[] };
        setHabits(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!habits) return;
    const scrollToEnd = (smooth = false) => {
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
      if (!prev) return null;
      const copy = [...prev];
      console.log({ copy });
      return copy.map(habit => {
        console.log({ habit });
        if (habit.id !== habitId) return habit;
        return { ...habit, stats: data.stats };
      });
    });
  };

  if (!habits) return null;

  return (
    <article className="Board">
      <div className="names">
        <div className="name">Habits</div>
        { habits.map(habit => (
          <div key={ habit.id + 'name' }
               className="name">{ habit.name }</div>
        )) }
      </div>
      <section ref={ wrapperRef }
               className="wrapper">
        <div className="rows"
             style={ { width: `${ datesPatternArray.length * 40 }px` } }>
          <div className="row dates">
            { datesPatternArray.map((_, index) => {
              const date = Date.now() - (24 * 60 * 60 * 1000) * (datesPatternArray.length - index - 1);
              return <div className="date"
                          key={ index }>
                <div> { format(date, 'dd.LL') } </div>
                <div>{ format(date, 'E') }</div>
              </div>;
            }) }
          </div>

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
      <div>
        <div className="name">streaks</div>
        { habits.map(habit => {
          let longestStreak = 0;
          let currentStreak = 0;

          habit.stats.forEach(stat => {
            if (stat === 2) {
              currentStreak++;
              longestStreak = longestStreak < currentStreak ? currentStreak : longestStreak;
            }
            if (stat === 0) {
              longestStreak = longestStreak < currentStreak ? currentStreak : longestStreak;
              currentStreak = 0;
            }
          })

          console.log({ longestStreak, currentStreak })

          return <div className="name">
            <div>{ currentStreak }</div>
            <div>{ longestStreak }</div>
          </div>
        })}
      </div>
    </article>
  );
};
