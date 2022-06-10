import { ImSpinner2 } from 'react-icons/im';

import './LoadingSpinner.css';

interface Props {
  style?: any;
}

export const LoadingSpinner = ({ style }: Props) => {

  return <ImSpinner2 style={style} className="LoadingSpinner"/>
}