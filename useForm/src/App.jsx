// App.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fields, setFields] = useState();
  const [submit, setSubmit] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit = (data) => {
    setFields(data);
    setSubmit(true);
    console.log(data);
    console.log(data.firstName.length);
  };

  return (
    <div className='App'>
      <h1>React Forms Library</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {submit ? <div className='success-message'>Register Successful</div> : null}

          <input type='text' className='input-field' placeholder='First Name' {...register('firstName', { required: 'First name is Required' })} />
          <br />
          <span className='error-message'>{errors.firstName?.message}</span>
          <br />
          <input type='text' className='input-field' placeholder='Last Name' {...register('lastName', { required: 'Last name is Required' })} />
          <br />
          <span className='error-message'>{errors.lastName?.message}</span>
          <br />
          <input
            type='text'
            className='input-field'
            placeholder='Email'
            {...register('Email', {
              required: 'Email is Required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email',
              },
            })}
          />
          <br />
          <span className='error-message'>{errors.Email?.message}</span>
          <br />
          <input
            type={visible ? 'text' : 'password'}
            className='input-field'
            placeholder='Password'
            {...register('Password', {
              required: 'Password is Required',
              minLength: {
                value: 4,
                message: 'Password must be more than 4 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be less than 20 characters',
              },
            })}
          />
          <br />
          <span onClick={() => setVisible(!visible)} className='password-toggle'>
            eye
          </span>
          <span className='error-message'>{errors.Password?.message}</span>
          <br />
          <button type='submit' className='register-button'>
            Register Here!
          </button>
        </form>

        {/* {submit && (
          <div style={{ marginTop: '20px' }}>
            <h2>Entered Data:</h2>
            <p>First Name: {fields?.firstName}</p>
            <p>Last Name: {fields?.lastName}</p>
            <p>Email: {fields?.Email}</p>
            <p>Password: {fields?.Password}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
