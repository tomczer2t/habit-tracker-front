import { ReactNode, useEffect, useRef } from 'react';
import { useHandleBlur } from '../../../hooks/useHandleBlur';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ChangeModal.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const ChangeModal = ({ children }: Props) => {

  const handleBlur = useHandleBlur('/settings');
  const btnRef = useRef<HTMLButtonElement>(null!);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/settings');
  };

  return (
    <div className="ChangeModal-shadow">
      <section className="ChangeModal"
               onBlur={ handleBlur }
               tabIndex={ 1 }>
        <button ref={ btnRef }
                className="ChangeModal__close-btn"
                onClick={ handleClick }><IoCloseCircleOutline className="ChangeModal__close-icon" /></button>
        <div className="Modal__content">
          { children }
        </div>
      </section>
    </div>
  );
};