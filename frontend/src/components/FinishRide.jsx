import axios from 'axios';
import React from 'react'
import {  useNavigate } from 'react-router-dom';

const FinishRide = (props) => {


  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

        rideId: props.ride._id


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        navigate('/captain-home')
    }

}

  return (
    <div>
        <div className='flex justify-between'>
            <h3 className=' text-2xl font-bold mb-4'>Finish this Ride</h3>
            <i onClick={()=>{props.setfinishRidePanel(false)}} className="text-2xl font-bold ri-arrow-down-wide-fill"></i>
          </div>
          <div className='flex items-center bg-yellow-300 p-2 rounded-lg justify-between mb-2'>
            <div className='flex items-center gap-2'>
                <img src='/DrivOnDriver.jpeg' className='w-15 object-cover h-15 rounded-full' />
                <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                      <h3 className='text-lg font-medium'>₹1{props.ride?.fare}</h3>
                      <p className='text-sm text-gray-600'>Cash</p>
                    </div>
              </div>
    
    
            </div>
    
            <div className='mt-6 w-full'>

                <button
                onClick={endRide}
                className='w-full flex justify-center mt-8 mb-3 bg-green-500 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>
              <p className='text-gray-700 mt-6 text-sm'>Click on finish ride button if you have completed the payment</p>
            </div>
            
          </div>
      </div>
  )
}

export default FinishRide