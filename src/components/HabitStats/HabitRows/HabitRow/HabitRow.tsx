import { HabitEntity } from 'types';
import { axios } from '../../../../api/axios';
import { useHabits } from '../../../../hooks/useHabits';
import './HabitRow.css';

interface Props {
  habit: Required<HabitEntity>;
}

export const HabitRow = ({ habit }: Props) => {

  const { habits, setHabits } = useHabits();

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
    <div className="HabitRow"
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
               data-name={ habit.name }
               style={{ backgroundColor: habit.color, color: habit.color }}
               className={ `item ${ textStatus }` } />
        );
      }) }
    </div>
  );
};