import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../actions/auth';
import { LOGGED_IN_USER } from '../actions/types';

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
      console.log('token', res.data);
      //save user token in redux store
      dispatch({ type: LOGGED_IN_USER, payload: { client_id, sl_token } });
      //save user token in localStorage - not good solution
      localStorage.setItem(
        'supermetrics_user',
        JSON.stringify({ client_id, sl_token })
      );
      //redirect user to the posts page
      navigate('/posts');
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
