import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './GoHomeBtn.css';

export const GoHomeBtn = () => <Link to="/" className="GoHomeBtn"><BsArrowLeftCircle /></Link>