import { GoBackBtn } from '../../components/common/GoBackBtn/GoBackBtn';
import { AddHabitForm } from '../../components/AddHabitForm/AddHabitForm';

import './AddHabitView.css';

export const AddHabitView = () => {

  return (
    <article className="AddHabitView">
      <GoBackBtn />
      <AddHabitForm />
    </article>
  );
};