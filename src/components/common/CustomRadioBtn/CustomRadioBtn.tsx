import { ChangeEvent, MouseEvent, useState } from 'react';

import './CustomRadioBtn.css';

interface Props {
  color: string;
  setColor: (key: string, value: string) => void;
  currentColor: string;
  label?: string;
  type?: 'checkbox' | 'color';
}

export const CustomRadioBtn = ({ color, setColor, currentColor, label, type = 'checkbox' }: Props) => {

  const [chekcboxColor, setCheckboxColor] = useState(color);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      setColor('color', chekcboxColor);
    } else {
      setCheckboxColor(e.target.value);
      setColor('color', e.target.value);

    }
  };

  const handleClick = (e: MouseEvent) => {
    if (type === 'color') {
      setCheckboxColor((e.target as HTMLInputElement).value);
      setColor('color', (e.target as HTMLInputElement).value);
    }
  };

  return (
    <label className="CustomRadioBtn"><span className="CustomRadioBtn__label">{ label }</span>
      <input type={ type }
             onClick={ handleClick }
             onChange={ handleChange }
             value={ chekcboxColor }
             data-checked={ currentColor === chekcboxColor }
             checked={ currentColor === chekcboxColor } />
      <span className="CustomRadioBtn__checkmark"
            style={ { backgroundColor: chekcboxColor } }></span>
    </label>
  );
};