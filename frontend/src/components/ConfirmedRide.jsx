import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div className=''>
      <div className='flex justify-between'>
          <h3 className=' text-2xl font-bold mb-4'>Confirm Your Ride</h3>
          <i onClick={() => {props.setConfirmRidePanel(false)}}  className="text-2xl font-bold ri-arrow-down-wide-fill"></i>
        </div>

        <div className='flex gap-2 flex-col justify-between items-center'>
          <img className='h-20' src='DrivOnCar.png' />
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
                  <h3 className='text-lg font-medium'>562/11-A</h3>
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
          <button className='w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmedRide