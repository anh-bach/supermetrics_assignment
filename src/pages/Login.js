import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../actions/auth';
import { LOGGED_IN_USER, UPLOAD_POST_CREATORS } from '../actions/types';
import { getPosts } from '../actions/post';
import { getUniqueUsers } from '../utils/getUniqueUsers';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check name input
    if (!name) {
      setNameError('Name is required!');
      return;
    } else {
      setNameError('');
    }

    //check email input
    if (!email) {
      setEmailError('Email is required!');
      return;
    } else {
      setEmailError('');
    }

    try {
      const res = await login({ name, email });
      const { client_id, sl_token } = res.data.data;

      //save user token in redux store
      dispatch({ type: LOGGED_IN_USER, payload: { client_id, sl_token } });
      //load posts from server
      const postsRes = await getPosts(sl_token);
      const rawPosts = postsRes.data.data.posts;
      //get all unique users - name sorted and posts created_time sorted
      const uniqueUsers = getUniqueUsers(rawPosts);
      //save the unique Users in redux store
      dispatch({ type: UPLOAD_POST_CREATORS, payload: uniqueUsers });
      //redirect user to the posts page
      navigate(`/posts/${uniqueUsers[0].id}`);
    } catch (error) {
      console.log('From login page', error);
    }
  };

  const handleNameChange = (e) => {
    //reset name error
    setNameError('');

    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    //reset email error
    setEmailError('');

    setEmail(e.target.value);
  };

  return (
    <div className='container__box--login'>
      <h1>Login</h1>

      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          {nameError && <span className='error'>{nameError}</span>}
          <input
            type='text'
            name={name}
            onChange={handleNameChange}
            className='form-input'
            placeholder='Enter your name...'
          />
        </div>
        <div className='form-control'>
          {emailError && <span className='error'>{emailError}</span>}
          <input
            type='email'
            value={email}
            onChange={handleEmailChange}
            className='form-input'
            placeholder='Enter your email...'
          />
        </div>
        <button type='submit' className='btn'>
          Go
        </button>
      </form>
    </div>
  );
};

export default Login;
