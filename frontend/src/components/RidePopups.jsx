import React from 'react'

const RidePopups = (props) => {
  return (
    <div>
    <div className='flex justify-between'>
        <h3 className=' text-2xl font-bold mb-4'>New Ride Available</h3>
        <i onClick={()=>props.setRidePopupPanel(false)} className="text-2xl font-bold cursor-pointer ri-arrow-down-wide-fill"></i>
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
        <button
        onClick={()=>{
          props.setConfirmRidePopupPanel(true)
          props.confirmRide()
        }}
        className='w-full mt-5 bg-green-500 cursor-pointer text-white font-semibold p-2 rounded-lg'>Accept</button>
        <button onClick={()=>props.setRidePopupPanel(false)} className='w-full mt-1 bg-gray-500 text-white font-semibold p-2 rounded-lg'>Decline</button>
      </div>
  </div>
  )
}

export default RidePopups