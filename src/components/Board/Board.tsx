import './Board.css';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { HabitEntity } from 'types';


const habit1: HabitEntity = {
  id: '1',
  userId: '1a',
  name: 'swimming',
  order: 1,
  stats: [2,2,2,2,2,2,2,1,2,2,0,0,2,2],
  color: 'red',
  createdAt:  new Date('2022-05-15'),
}

const habit2: HabitEntity = {
  id: '2',
  userId: '1a',
  name: 'running',
  order: 2,
  stats: [2,2,2,2,2,1,1,2,2,2],
  color: 'red',
  createdAt:  new Date('2022-05-10'),
}

export const Board = () => {

  const swimming = [2, 2, 2, 2, 2, 1, 1, 2, 2, 2];
  const running = [2, 2, 2, 1, 2, 2, 2, 0 , 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];

  const habits = [swimming, running];
  const longestHabit = habits.reduce((prev, curr) => prev.length > curr.length ? prev : curr, habits[0]);



  habits.forEach(habit => {
    if (longestHabit === habit) return;
    const difference = longestHabit.length - habit.length;
    for (let i = 0; i < difference; i++) {
      habit.unshift(0);
    }
  })

  const wrapperRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const scrollToEnd = (smooth = false) => {
      wrapperRef.current.scrollTo(wrapperRef.current.scrollWidth, 0,  );
    };

    window.addEventListener('resize', () => {
      const scrollFromRightEdge = Math.abs((wrapperRef.current.scrollWidth - wrapperRef.current.offsetWidth)- wrapperRef.current.scrollLeft);
      if (scrollFromRightEdge < 120) {
        scrollToEnd()
      }
    });


    scrollToEnd();
  }, []);


  const handleClick = (index: number) => {

  }

  return (
    <article className="Board">
      <div className="names">
        <div className="name">Habits</div>
        <div className="name">swimming and runningn and jogging here</div>
        <div className="name">running</div>
      </div>
      <section ref={ wrapperRef }
               className="wrapper">
        <div className="rows"
             style={ { width: `${ longestHabit.length * 80 }px` } }>
          <div className="row dates">
            { longestHabit.map((stat, index) => {
              const date = Date.now() - (24 * 60 * 60 * 1000) * (longestHabit.length - index - 1);
              return <div className="date">
                <div> { format(date, 'dd.LL') } </div>
                <div>{ format(date, 'E') }</div>
              </div>;
            }) }
          </div>

          { habits.map(habit => (
            <div className="row">
              { habit.map((stat, i) => (
                <div onClick={ () =>  handleClick(i) } className={`item ${ stat === 0 ? 'undone' : stat === 1 ? 'skipped' : 'done' }`}>{ i + 1 }</div>
              )) }
            </div>
          )) }

        </div>
      </section>
    </article>
  );
};
