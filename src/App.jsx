import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicRouter from '@/Pages/PublicRouter';
import { UserListContextProvider } from '@/Context/UsersListContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserListContextProvider>
        <Routes>
          <Route element={<PublicRouter />} path='/*' />
        </Routes>
      </UserListContextProvider>
    </BrowserRouter>
  );
};

export default App;
