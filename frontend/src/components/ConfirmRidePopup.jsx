import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const ConfirmRidePopup = (props) => {
  
  const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }

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
            <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstName + " " + props.ride?.user.fullname.lastName}</h2>
        </div>
        <div className='text-lg font-semibold'>2.2Km</div>
      </div>
     

      <div className='flex gap-2 flex-col justify-between items-center'>
        
        <div className='w-full'>
          <div className='flex items-center gap-5  border-b-2 border-b-gray-300 p-2'>
            <i className='ri-map-pin-fill text-2xl'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>


          <div className='flex items-center gap-5 border-b-2 border-b-gray-300 p-2'>
            <i className='ri-map-pin-add-fill text-2xl'></i>
              <div>
                <h3 className='text-lg font-medium'>D-66</h3>
                <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
              </div>
          </div>


          <div className='flex items-center gap-5 p-2'>
          <i className="text-2xl ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                  <p className='text-sm text-gray-600'>Cash</p>
                </div>
          </div>


        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHander}>

            <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP' className='bg-[#eee] font-mono px-12 py-2 text-lg rounded-lg w-full mt-3' />
            <button className='w-full flex justify-center mt-8 cursor-pointer mb-3 bg-green-500 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            <button
            onClick={()=>{
              props.setConfirmRidePopupPanel(false)
              props.setRidePopupPanel(false)}}
              className='w-full mt-1 bg-gray-500 text-white cursor-pointer font-semibold p-2 rounded-lg'>Cancel</button>
          </form>
          
        </div>
        
      </div>
  </div>
  )
}

export default ConfirmRidePopup