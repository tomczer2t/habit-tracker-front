import React from 'react';
import { Board } from '../components/Board/Board';
import { Menu } from '../components/layout/Menu/Menu';
import { Outlet } from 'react-router-dom';
import { PageFooter } from '../components/layout/PageFooter/PageFooter';

export const MainLayout = () => {
  return (
   <>
     <Board>
       <Menu />
       <Outlet />
     </Board>
     <PageFooter />
   </>
  );
};