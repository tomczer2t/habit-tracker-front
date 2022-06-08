import { GoHomeBtn } from '../../components/common/GoHomeBtn/GoHomeBtn';
import './AddHabitView.css';
import { AddHabitForm } from '../../components/AddHabitForm/AddHabitForm';

export const AddHabitVIew = () => {

  return (
    <article className="AddHabitView">
      <GoHomeBtn />
      <AddHabitForm />
    </article>
  );
};