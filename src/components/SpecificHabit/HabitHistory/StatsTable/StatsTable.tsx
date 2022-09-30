import React from 'react';
import './StatsTable.css';

interface Props {
  stats: number[];
  color: string;
}

export const StatsTable = ({ stats, color }: Props) => {

  return (
    <div className="StatsTable">
      { stats.map((stat, index) => {
        let textStatus: string;
        if (stat === 0) {
          textStatus = 'undone';
        } else if (stat === 2) {
          textStatus = 'done';
        } else {
          textStatus = 'skipped';
        }

        return <div key={ index }
                    className={ `StatsTable__cell StatsTable__cell--${ textStatus }` }
                    style={ { backgroundColor: color, color: color } }
        />;
      }) }
    </div>
  );
};
