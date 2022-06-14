import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfMobileOrTablet } from '../utils/checkIfMobileOrTablet';

export const useHandleBlur = (backTo = '/') => {

  const navigate = useNavigate();
  const isMobileOrTablet = checkIfMobileOrTablet();

  return (e: SyntheticEvent) => {
    const target = e.currentTarget;
    setTimeout(() => {
      if (isMobileOrTablet) return;
      if (!target.contains(document.activeElement)) {
        navigate(backTo);
      }
    }, 0);
  };
};