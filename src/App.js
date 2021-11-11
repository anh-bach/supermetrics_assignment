import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import PostsByUser from './pages/PostsByUser';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/posts/:userId' element={<PostsByUser />} />
    </Routes>
  );
}

export default App;
