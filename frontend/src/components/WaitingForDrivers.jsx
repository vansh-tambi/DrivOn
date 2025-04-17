import React from 'react'

const WaitingForDrivers = (props) => {
  return (
    <div>
        <div className='flex items-center justify-center -mt-9'>
            <i onClick={() => {props.setWaitingForDriver(false)}}  className=" text-2xl font-bold ri-arrow-down-wide-fill"></i>
        </div>
        <h1 className='text-xl font-semibold text-center mb-8'>Ride accepted, Waiting for Captain</h1>
        
      <div className='flex justify-between'>
          
            
                <img className='h-20' src='DrivOnCar.png' />

                <div className='flex flex-col'>
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstName}</h2>
                        <h4 className='text-xl font-semibold -mt-2 -mb-1'>{props.captain?.vehicle.plate}</h4>
                        <p className='text-gray-700 text-sm'>{props.captain?.vehicle.vehicleType}</p>
                        <h1 className='text-gray-700 mt-4 font-bold text-xl'>Otp: <span className='text-[#FF6A00]'>{props.ride?.otp}</span></h1>
                    </div>    
            

          
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
          
        </div>
    </div>
  )
}

export default WaitingForDrivers