import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';

function MainLayout() {
  return (
    <div>
      <Navbarmenu />
      <Outlet />
    </div>
  );
}

export default MainLayout;
