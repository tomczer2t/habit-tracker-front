import { format } from 'date-fns';

import './DatesRow.css';

export const DatesRow = () => {

  const datesPatternArray = Array(40).fill(0);

  return (
    <div className="DatesRow">
      { datesPatternArray.map((_, index) => {
        const date = Date.now() - (24 * 60 * 60 * 1000) * (datesPatternArray.length - index - 1);
        return <div className="DatesRow__cell"
                    key={ index }>
          <div>{ format(date, 'E') }</div>
          <div> { format(date, 'dd.LL') } </div>
        </div>;
      }) }
    </div>
  );
};