import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className='bg-no-repeat bg-cover bg-center bg-[url("/trafficlight.jpg")] h-screen pt-4 w-full bg-red-400 flex justify-between flex-col'>
        <img src="/DrivOn.png" className='w-30 ml-4'></img>
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold'>Get Started Uber</h2>
          <Link to="/login" className='w-full flex items-center justify-center bg-black text-white py-3 rounded-md mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home