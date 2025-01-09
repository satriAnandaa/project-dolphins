import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';

function MainLayout({children}) {
  return (
    <div>
      
      <Navbarmenu />
      {children}
    </div>
  );
}

export default MainLayout;
