import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const ConfirmRidePopup = (props) => {

  const [otp, setOtp] = useState('');

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  return (
    <div>
    <div className='flex justify-between'>
        <h3 className=' text-2xl font-bold mb-4'>Confirm the Ride to start</h3>
        <i onClick={()=>{props.setConfirmRidePopupPanel(false), props.setRidePopupPanel(false)}} className="text-2xl font-bold ri-arrow-down-wide-fill"></i>
      </div>
      <div className='flex items-center bg-yellow-300 p-2 rounded-lg justify-between mb-2'>
        <div className='flex items-center gap-2'>
            <img src='/DrivOnDriver.jpeg' className='w-15 object-cover h-15 rounded-full' />
            <h2 className='text-xl font-medium'>Harsh Patel</h2>
        </div>
        <div className='text-lg font-semibold'>2.2Km</div>
      </div>
     

      <div className='flex gap-2 flex-col justify-between items-center'>
        
        <div className='w-full'>
          <div className='flex items-center gap-5  border-b-2 border-b-gray-300 p-2'>
            <i className='ri-map-pin-fill text-2xl'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm text-gray-600'>Kankriya Talab, Bhopal</p>
            </div>
          </div>


          <div className='flex items-center gap-5 border-b-2 border-b-gray-300 p-2'>
            <i className='ri-map-pin-add-fill text-2xl'></i>
              <div>
                <h3 className='text-lg font-medium'>D-66</h3>
                <p className='text-sm text-gray-600'>Nehru Nagar, Bhopal</p>
              </div>
          </div>


          <div className='flex items-center gap-5 p-2'>
          <i className="text-2xl ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>₹193.8</h3>
                  <p className='text-sm text-gray-600'>Cash</p>
                </div>
          </div>


        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>

            <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' className='bg-[#eee] font-mono px-12 py-2 text-lg rounded-lg w-full mt-3' />
            <Link to='/captain-riding' className='w-full flex justify-center mt-8 mb-3 bg-green-500 text-white font-semibold p-2 rounded-lg'>Confirm</Link>
            <button onClick={()=>{props.setConfirmRidePopupPanel(false); props.setRidePopupPanel(false)}} className='w-full mt-1 bg-gray-500 text-white font-semibold p-2 rounded-lg'>Cancel</button>
          </form>
          
        </div>
        
      </div>
  </div>
  )
}

export default ConfirmRidePopup