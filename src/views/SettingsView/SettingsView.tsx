import { GoBackBtn } from '../../components/common/GoBackBtn/GoBackBtn';
import { SettingsOptions } from '../../components/SettingsOptions/SettingsOptions';
import { Outlet } from 'react-router-dom';

import './SettingsView.css';

export const SettingsView = () => {

  return (
    <article className="SettingsView">
      <GoBackBtn />
      <h1 className="SettingsView__title">Settings</h1>
      <SettingsOptions />
      <Outlet />
    </article>
  );
};