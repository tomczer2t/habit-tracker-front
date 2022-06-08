import { CustomRadioBtn } from '../../common/CustomRadioBtn/CustomRadioBtn';
import './Colors.css';

interface Props {
  currentColor: string;
  handleChange: (key: string, value: string) => void;
}

export const Colors = ({ handleChange, currentColor }: Props) => {

  const colors = ['#d71212', '#3731d9', '#a800d9', '#0ee14d', '#e1be0e', '#e1460e'];

  return (
    <div className="Colors">
      { colors.map((color, index) => (
        <CustomRadioBtn key={ index }
                        color={ color }
                        setColor={ handleChange }
                        currentColor={ currentColor } />
      )) }
      <CustomRadioBtn color="#303242"
                      setColor={ handleChange }
                      currentColor={ currentColor }
                      type="color"
                      label="custom" />
    </div>
  );
};