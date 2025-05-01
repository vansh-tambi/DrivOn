import React from 'react'

const LookingForDrivers = (props) => {
  return (
    <div className='md:w-2/3'>
      <div className='flex justify-between'>
          <h3 className=' text-2xl font-bold mb-4'>Looking for Driver</h3>
          <i onClick={() => {props.setVehicleFound(false)}}  className="text-2xl font-bold ri-arrow-down-wide-fill"></i>
        </div>

        <div className='flex gap-5 flex-col justify-between items-center'>
          <img 
            className='h-30' 
            src={
              props.vehicleType === 'car' ? 'LookingForDriverCar.png' :
              props.vehicleType === 'auto' ? 'LookingForDriverAuto.png' :
              'LookingForDriverBike.png'
            } 
          />
          <div className='w-full'>
            <div className='flex items-center gap-5  border-b-2 border-b-gray-300 p-2'>
              <i className='ri-map-pin-fill text-2xl'></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm text-gray-600'>{props.pickup}</p>
              </div>
            </div>


            <div className='flex items-center gap-5 border-b-2 border-b-gray-300 p-2'>
              <i className='ri-map-pin-add-fill text-2xl'></i>
                <div>
                  <h3 className='text-lg font-medium'>D-66</h3>
                  <p className='text-sm text-gray-600'>{props.destination}</p>
                </div>
            </div>


            <div className='flex items-center gap-5 p-2'>
            <i className="text-2xl ri-money-rupee-circle-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                    <p className='text-sm text-gray-600'>Cash</p>
                  </div>
            </div>


          </div>
          
        </div>
    </div>
  )
}

export default LookingForDrivers