import { GoBackBtn } from '../../components/common/GoBackBtn/GoBackBtn';
import './AddHabitView.css';
import { AddHabitForm } from '../../components/AddHabitForm/AddHabitForm';

export const AddHabitView = () => {

  return (
    <article className="AddHabitView">
      <GoBackBtn />
      <AddHabitForm />
    </article>
  );
};