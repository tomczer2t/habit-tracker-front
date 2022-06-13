import './Description.css';
import { Link } from 'react-router-dom';

export const Description = () => {

  return (
    <section className="Description">
      <h2 className="Description__title">Welcome on Habit Tracker</h2>
      <div className="Description__paraphs">
        <p>This application is designed for people who want to be a better version of themselves every day. Track your habits. Add new ones and edit old ones. Stay motivated by your current streak and don't let your streak end. </p>
        <p><Link to="/register">Create an account to track your habits!</Link></p>
      </div>
    </section>
  );
};