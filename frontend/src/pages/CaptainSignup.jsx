import React from 'react';
import {Link} from 'react-router-dom';

const CaptainSignup = () => {
  return (
    <div className='p-5 flex flex-col justify-between items-center bg-[#262f39] h-screen'>

      <div>
      <img src="/DrivOnCaptain.png" className='w-30 mb-13'></img>
      <form >
        <h3 className='text-lg mb-2 text-white'>What's our Captain's Name</h3>
        <div className='flex gap-4 mb-6'>
        
        <input className='w-1/2 bg-[#eeeeee]  rounded-md px-2 py-2 border text-lg placeholder:text-base'
            required type='text' placeholder='First name'/>
        <input className='w-1/2 bg-[#eeeeee] rounded-md px-2 py-2 border text-lg placeholder:text-base'
            required type='text' placeholder='Last name'/>
            </div>
          <h3 className='text-lg mb-2 text-white'>What's our Captain's email</h3>
          <input className='w-full bg-[#eeeeee] rounded-md mb-5 px-2 py-2 border text-lg placeholder:text-base'
            required type='email' placeholder='email@example.com'/>

        <h3 className='text-white text-lg mb-2'>Enter Password</h3>

        <input className='bg-[#eeeeee] mb-6 rounded-md px-2 py-2 border w-full text-lg placeholder:text-base' 
           required type='password' placeholder='Password'/>
    
        <button className='bg-[#111] mb-3 text-white rounded-md px-2 py-2 w-full text-lg'>Signup</button>
      </form>
        <p className='text-center mb-6 text-white'>Already have a account? <Link to="/captain-login" className='text-[#3A86FF]'>Login in here</Link></p>
      </div>

      
      <p className='text-[10px] leading-tight text-gray-600'>This site is protected by reCaptcha and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Services</span> apply.</p>
      

    </div>
  )
}

export default CaptainSignup