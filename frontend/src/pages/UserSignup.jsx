/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const verifyEmail = async (email) => {
  const apiKey = '7c1c70e2185c53db58ba3cf98791d834e7553d1e'; // replace with your real key
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

  try {
    const res = await axios.get(url);
    const result = res.data?.data;

    return result?.status === 'valid'; // Only allow valid emails
  } catch (err) {
    console.error("Email verification failed:", err);
    return false;
  }
};


const UserSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e)=>{
    e.preventDefault();

    const isValidEmail = await verifyEmail(email);
  if (!isValidEmail) {
    alert("❌ Email address doesn't exist or is not valid. Please use a real one.");
    return;
  }
    
    const newUser = {
      email:email,
      password:password,
      fullname:{
        firstName:firstName,
        lastName:lastName
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className='p-7 flex flex-col justify-between items-center bg-white h-screen'>

      <div>
      <img src="/DrivOnOrange.png" className='w-30 mb-13'></img>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className='text-lg mb-2 text-black'>What's Your Name</h3>
        <div className='flex gap-4 mb-6'>
        
        <input className='w-1/2 bg-[#eeeeee]  rounded-md px-2 py-2 border text-lg placeholder:text-base'
            required type='text' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name'/>
        <input className='w-1/2 bg-[#eeeeee] rounded-md px-2 py-2 border text-lg placeholder:text-base'
            required type='text' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder='Last name'/>
            </div>
          <h3 className='text-lg mb-2 text-black'>What's Your email</h3>
          <input className='w-full bg-[#eeeeee] rounded-md mb-5 px-2 py-2 border text-lg placeholder:text-base'
            required type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email@example.com'/>

        <h3 className='text-black text-lg mb-2'>Enter Password</h3>

        <input className='bg-[#eeeeee] mb-6 rounded-md px-2 py-2 border w-full text-lg placeholder:text-base' 
           required type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
    
        <button onClick={(e)=>{submitHandler(e)}} className='bg-[#111] mb-3 text-white cursor-pointer rounded-md px-2 py-2 w-full text-lg'>Create Account</button>
      </form>
        <p className='text-center mb-6 text-black'>Already have a account? <Link to="/login" className='text-[#3A86FF]'>Login in here</Link></p>
      </div>

      
        <p className='text-[10px] leading-tight text-gray-600'>This site is protected by reCaptcha and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Services</span> apply.</p>
      

    </div>
  )
}

export default UserSignup