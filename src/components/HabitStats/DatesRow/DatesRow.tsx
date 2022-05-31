import { format } from 'date-fns';
import './DatesRow.css';

export const DatesRow = () => {

  const datesPatternArray = Array(40).fill(0);

  return (
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
  )
}