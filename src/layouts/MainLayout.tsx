import { Board } from '../components/Board/Board';
import { Menu } from '../components/Menu/Menu';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Board>
      <Menu />
      <Outlet />
    </Board>
  );
};