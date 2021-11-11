import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container__box--home'>
      <h1>Welcome to the App! Please click the button to continue</h1>
      <Link className='btn' to='/login'>
        Go
      </Link>
    </div>
  );
};

export default Home;
