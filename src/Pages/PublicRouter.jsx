import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Home, Employees, Error } from './index';

const PublicRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />

      <Route path='/home' element={<Home />} />
      <Route path='/employees' element={<Employees />} />

      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default PublicRouter;
