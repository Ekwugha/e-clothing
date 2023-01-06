import React from 'react';
import Homepage from '../components/Homepage';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function LoginScreen() {
    // using useForm hook we installed
    const { handleSubmit, register, formState: { errors } } = useForm();
    const submitHandler = ({ email, password }) => {
        console.log(email, password)
    }
  return (
    <Homepage title="Login">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-xl">Login</h1>

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" 
          {...register('email', { required: 'Please enter email', pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
            message: 'Please enter a valid email',
          } })}
          className="w-full" id="email" autoFocus></input>
          {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {
                ...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 8, message: 'Password is more than 8 characters' },
                })
            }
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
        </div>

        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>

        <div className="mb-4">
          {/* nbsp is an html stuff use to create space} */}
          Don&apos;t have an account? &nbsp;
          <Link href="register">Click Register</Link>
        </div>
      </form>
    </Homepage>
  );
}
   