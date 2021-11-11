import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Posts from './pages/Posts';
import PostsByUser from './pages/PostsByUser';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/posts/:userId' element={<PostsByUser />} />
    </Routes>
  );
}

export default App;
