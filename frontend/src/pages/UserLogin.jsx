/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();
    setEmail('');
    setPassword('');
    const userData = {
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if(response.status === 200){
      const data = response.data
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

  }

  return (
    <div className='p-7 flex flex-col justify-between items-center relative bg-white h-screen'>

      <img src="/DrivOnOrange.png" className='w-30 md:w-40 absolute mb-13 left-5 top-5'></img>
      <div>
      <form className='mt-[5rem]' onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className='text-lg mb-2 text-black'>What's Your email</h3>
        <input className='bg-[#eeeeee] mb-7 rounded-md px-2 py-2 border w-full text-lg placeholder:text-lg'
          value={email} onChange={(e)=>{setEmail(e.target.value)}}  required type='email' placeholder='email@example.com'/>

        <h3 className='text-black text-lg mb-2'>Enter Password</h3>

        <input className='bg-[#eeeeee] mb-7 rounded-md px-2 py-2 border w-full text-lg placeholder:text-lg' 
          value={password} onChange={(p)=>{setPassword(p.target.value)}} required type='password' placeholder='Password'/>
    
        <button className='bg-black mb-3 cursor-pointer text-white rounded-md px-2 py-2 w-full text-lg'>Login</button>
      </form>
        <p className='text-center mb-7 text-gray-700'>New here? <Link to="/signup" className='text-[#3A86FF]'>Create new Account</Link></p>
      </div>

      <div className='w-full flex items-center justify-center'>
        <Link to="/captain-login" className='flex justify-center bg-[#FF6A00] mb-7 font-bold text-white rounded-md px-2 py-2 md:w-1/5 w-full text-lg'>Sign in as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin